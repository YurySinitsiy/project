(() => {
    //*Создаем функцию для записи общего коичества побед в LocalStorage
    ////////////////////////////////////
    function dataToJson(data) {
        return JSON.stringify(data);
    }

    function jsonToData(json) {
        return JSON.parse(json);
    }

    function saveDataToLocalStorage(key, data) {
        localStorage.setItem(key, dataToJson(data));
    }
    //*Создаем функцию для чтения и получения данных из LocalStorage
    function readDataFromLocalStorage(key) {
        return jsonToData(localStorage.getItem(key));
    }
    ////////////////////////////////////////

    //* Создаем контейнер игры
    function createContainerGame() {
        const containerGame = document.createElement('div');
        containerGame.classList.add('container');
        return containerGame
    };

    //* Создаем и возвращаем заголовок игры
    function createGameTitle() {
        const gameTitle = document.createElement('h2');
        gameTitle.textContent = 'Игра в пары';
        gameTitle.classList.add('title');
        return gameTitle
    };

    //* Создаем и возвращаем главное меню
    function createMainMenu() {
        const mainMenuForm = document.createElement('form');
        mainMenuForm.classList.add('menu-form');

        const mainMenuInput = document.createElement('input');
        mainMenuInput.type = 'text';
        mainMenuInput.placeholder = 'Введите количество колонок (4/6/8/10)';
        mainMenuInput.classList.add('menu-input');

        const mainMenuButton = document.createElement('button');
        mainMenuButton.classList.add('button')
        mainMenuButton.textContent = ('Начать игру')

        mainMenuForm.append(mainMenuInput, mainMenuButton);

        return {
            mainMenuForm,
            mainMenuInput,
            mainMenuButton,
        };
    }

    //* Создаем и возвращаем список карточек
    function createCardsList() {
        const cardsList = document.createElement('ul');
        cardsList.classList.add('list')
        return cardsList
    };

    //* Функция генерации массива парных чисел
    function createNumbersArray(columns) {
        let count = columns * 2;
        if (columns === 6) {
            count = 18
        }

        if (columns === 8) {
            count = 32
        }

        if (columns === 10) {
            count = 50
        }

        const evenNumbers = [];

        for (let i = 1; i <= count; i++) {
            evenNumbers.push(i, i);
        }

        return evenNumbers;
    }

    //console.log(createNumbersArray());

    //* Функция перемешивания массива
    function shuffle(arr) {
        let n = arr.length; // найти длинну массива
        for (let i = n - 1; i > 0; i--) { // проход по массиву в обратном порядке
            let j = Math.floor(Math.random() * (i + 1)); // генерация случайного числа о
            [arr[i], arr[j]] = [arr[j], arr[i]]; // замена местами элементов с индексами j и i

        }
        return arr
    };
    //console.log(shuffle(evenNumbers));

    //* Создаем массив с перемешанными номерами 
    const arrayMixNumbers = shuffle(createNumbersArray());
    console.log(arrayMixNumbers);

    //* Основная функция игры
    function startGame() {
        const container = createContainerGame(); // Вызов функции создания контейнера
        const gameTitle = createGameTitle(); // Вызов функции создания заголовка
        document.body.append(container); //Добавить контейнер в боди
        container.append(gameTitle); //Добавить заголовок в контейнер

        const mainMenu = createMainMenu(); // Вызов функции создания меню
        container.append(mainMenu.mainMenuForm)

        //Добавляем обработчик на поле ввода, чтобы кнопка создания дела становилась активной
        // при вводе текста в поле
        mainMenu.mainMenuInput.addEventListener('input', () => {
            mainMenu.mainMenuButton.disabled = !mainMenu.mainMenuInput.value;
        });

        mainMenu.mainMenuButton.disabled = true;

        //Браузер создает событие submit на форме по нажатию Enter или на кнопку 
        mainMenu.mainMenuForm.addEventListener('submit', (e) => {
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            let inputValue = parseInt(mainMenu.mainMenuInput.value);

            if (isNaN(inputValue) || inputValue < 4 || inputValue > 10 || inputValue % 2 !== 0) {
                inputValue = 4;
            };

            // игнорируем, если пользователь ничего не ввел в поле
            if (!inputValue) {
                return;
            };
            // изменяем количество колонок в контейнере игры
            container.style.setProperty('--columns', inputValue);
            container.style.setProperty('--container-width', `${inputValue * 170}px`);

            // изменяем количество колонок в контейнере игры
            const arrayMixNumbers = shuffle(createNumbersArray(inputValue));

            mainMenu.mainMenuForm.classList.add('display-none');

            const gameCardsList = createCardsList(); // Вызов функции создания списка карточек
            container.append(gameCardsList) // Добавить список в контейнер

            let firstCard, secondCard;
            let foundPairs = 0; // Количество найденных пар
            const totalPairs = arrayMixNumbers.length / 2; //Всего коичество пар
            let gameWin = readDataFromLocalStorage('gameWin') || 0; // Количество выигранных игр

            let timer = 900; // Устанавливаем таймер на 360 секунд
            let timerElement = document.createElement('span');
            timerElement.classList.add('timer');
            container.append(timerElement);

            let timerInterval = setInterval(() => {
                timer--;
                if (timer <= 0) {
                    clearInterval(timerInterval);
                    alert('Время вышло! Игра окончена.');
                    location.reload();
                } else {
                    timerElement.textContent = `Время: ${timer} секунд`;
                }
            }, 1000);

            for (let i = 0; i < arrayMixNumbers.length; i++) { // Создание карточек
                const card = document.createElement('li');
                card.classList.add('card')
                card.classList.add('card-shirt')

                const cardNumber = document.createElement('span'); // Создание номера карточки
                cardNumber.textContent = arrayMixNumbers[i];
                cardNumber.classList.add('card-number');

                gameCardsList.append(card);
                card.append(cardNumber);

                card.addEventListener('click', () => {
                    card.classList.remove('card-shirt');

                    if (!firstCard) {
                        firstCard = card;

                    } else if (!secondCard) {
                        secondCard = card;

                        if (firstCard.textContent === secondCard.textContent) {
                            firstCard.classList.add('card-open');
                            secondCard.classList.add('card-open');
                            foundPairs++;
                            firstCard = null;
                            secondCard = null;

                            if (foundPairs === totalPairs) {
                                const gameWinMassage = document.createElement('span');
                                gameWinMassage.textContent = 'Победа!';
                                gameWinMassage.classList.add('game-win_text')
                                container.append(gameWinMassage);
                                gameWin++;
                                saveDataToLocalStorage('gameWin', gameWin);
                                clearInterval(timerInterval); // Останавливаем таймер
                                const totalGameWinMassage = document.createElement('span');
                                totalGameWinMassage.textContent = `Всего побед - ${gameWin}`
                                totalGameWinMassage.classList.add('game-win_text');
                                container.append(totalGameWinMassage);
                                const gameAgainButton = document.createElement('button');
                                gameAgainButton.classList.add('game-again-button');
                                gameAgainButton.textContent = 'Сыграть заново';
                                container.append(gameAgainButton);
                                gameAgainButton.addEventListener('click', () => {
                                    location.reload();

                                });
                            }
                        } else {
                            // Карточки не совпали, переворачиваем их обратно
                            setTimeout(() => {
                                firstCard.classList.add('card-shirt');
                                secondCard.classList.add('card-shirt');
                                firstCard = null;
                                secondCard = null;
                            }, 200);
                        }
                    }
                });
            };
        });
    };

    startGame();
    window.startGame = startGame;
})();