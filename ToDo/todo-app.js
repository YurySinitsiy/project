(function () {
    //* Создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle
    }

    //* Создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        let form = document.createElement('form'); //создать форму
        let input = document.createElement('input'); // создать инпут
        let buttonWrapper = document.createElement('div'); // создать обертку кнопки
        let button = document.createElement('button'); // создать кнопку

        form.classList.add('input-group', 'mb-3'); //назначить класс форме
        input.classList.add('form-control'); // назначить класс инпуту
        input.placeholder = 'Введите название нового дела'; // назначить placeholder инпуту
        buttonWrapper.classList.add('input-group-append'); // назначить класс обертки кнопки
        button.classList.add('btn', 'btn-primary'); // назначить класс кнопке
        button.textContent = 'Добавить дело'; // назначить текст кнопке

        buttonWrapper.append(button); // добавить кнопку в обертку
        form.append(input, buttonWrapper); //добавить инпут в форму

        return {
            form,
            input,
            button,
        };
    }

    //*Создаем и возвращаем список элементов
    function createToDoList() {
        let list = document.createElement('ul'); //создать список
        list.classList.add('list-group'); //добавить класс списка
        return list;
    }

    //*Создаем и возвращаем элементы списка
    function createTodoItem(obj) {

        let item = document.createElement('li'); // создаем элемент списка
        // кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div') // создаем группу кнопок
        let doneButton = document.createElement('button'); // создаем кнопку Готово
        let deleteButton = document.createElement('button'); // Создаем кнопку Удалить

        // Устанавливаем стили для элемента списка, а также для размещения кнопок в его 
        // правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = obj.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm'); // добавить стили группе кнопок
        doneButton.classList.add('btn', 'btn-success'); // добавить стиои кнопке Готово
        doneButton.textContent = 'Готово'; // добавить текст кнопке Готово
        deleteButton.classList.add('btn', 'btn-danger'); //добавить стили кнопке Удалить
        deleteButton.textContent = 'Удалить'; // добавить текст кнопке Удалить

        //Вкладываем кнопки в отдельный элемент, чтобы они объединиялись в одну группу
        buttonGroup.append(doneButton); // добавить кнопку Готово в группу кнопок
        buttonGroup.append(deleteButton); // добавить кнопку Удалить в группу кнопок
        item.append(buttonGroup); // добавить группу кнопок в элемент li списка

        //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
        return {
            item,
            doneButton,
            deleteButton,
        };

    }

    //*Создаем функцию для записи списка дел в LocalStorage
    ////////////////////////////////////
    function dataToJson(data) {
        return JSON.stringify(data);
    }

    function jsonToData(json) {
        return JSON.parse(json);
    }
    ////////////////////////////////////////////
    function saveDataToLocalStorage(key, data) {
        localStorage.setItem(key, dataToJson(data));
    }

    //*Создаем функцию для чтения и получения данных из LocalStorage
    function readDataFromLocalStorage(key) {
        return jsonToData(localStorage.getItem(key));
    }
    //*Основная функция приложения
    function createTodoApp(container, title = 'Список дел', listName) {
        let todoAppTitle = createAppTitle(title); //Вызов функции создания заголовка приложения
        let todoItemForm = createTodoItemForm(); //Вызов функции создания формы
        let todoList = createToDoList(); //Вызов функции создания списка

        container.append(todoAppTitle); //добавить заголовок в контейнер
        container.append(todoItemForm.form); // Добавить форму в контейнер
        container.append(todoList); // Добавить список в контейнер

        let todoItemArr = readDataFromLocalStorage(listName) || []; //Получаем массив из LocalStorage, либо создаем пустой;

        //Добавляем обработчик на поле ввода, чтобы кнопка создания дела становилась активной
        // при вводе текста в поле
        todoItemForm.input.addEventListener('input', function () {
            todoItemForm.button.disabled = !todoItemForm.input.value;
        });

        todoItemForm.button.disabled = true;

        //Браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
        todoItemForm.form.addEventListener('submit', function (e) {
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();

            //игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }

            // создание объекта с name и done для передачи в функцию createTodoItem
            let obj = {
                name: todoItemForm.input.value,
                done: false,
                id: generateId(),
            }

            // создание функции поиска максимального id
            function generateId() {
                if (todoItemArr.length === 0) {
                    return 1;
                }
                let maxId = Math.max(...todoItemArr.map(item => item.id)); //поиск максимального id в массиве todoItemArr и возвращение его + 1
                return maxId + 1;
            }

            let todoItem = createTodoItem(obj);
            todoItemArr.push(obj);
            saveDataToLocalStorage(listName, todoItemArr);

            //добавляем обработчики на кнопки
            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');
                obj.done = !obj.done;
                let itemIndexDone = todoItemArr.findIndex(item => item.id === obj.id);
                if (itemIndexDone !== -1) {
                    todoItemArr[itemIndexDone].done = obj.done;

                }
                // console.log(todoItemArr);
                saveDataToLocalStorage(listName, todoItemArr);
            });

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    let itemIndexDelete = todoItemArr.findIndex(item => item.id === obj.id);
                    if (itemIndexDelete !== -1) {
                        todoItemArr.splice(itemIndexDelete, 1);
                    }
                }
                // console.log(todoItemArr);
                saveDataToLocalStorage(listName, todoItemArr);
            });
            // создаем и добавляем в список новое дело с названием из поля для вводы
            todoList.append(todoItem.item);

            //обнуляем значение в поле, чтобы не пришлось стирать его вручнуюк
            todoItemForm.input.value = '';

        });
        if (todoItemArr.length > 0) {
            todoItemArr.forEach(function (item) {
                let todoItem = createTodoItem(item);
                todoList.append(todoItem.item);

                // Добавляем обработчики на кнопки
                todoItem.doneButton.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                    item.done = !item.done;
                    let itemIndexDone = todoItemArr.findIndex(todoItem => todoItem.id === item.id);
                    if (itemIndexDone !== -1) {
                        todoItemArr[itemIndexDone].done = item.done;
                    }
                    saveDataToLocalStorage(listName, todoItemArr);
                });

                todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        let itemIndexDelete = todoItemArr.findIndex(todoItem => todoItem.id === item.id);
                        if (itemIndexDelete !== -1) {
                            todoItemArr.splice(itemIndexDelete, 1);
                        }
                    }
                    saveDataToLocalStorage(listName, todoItemArr);
                });

                // Устанавливаем класс для элемента списка, если он был отмечен как "Готово"
                if (item.done) {
                    todoItem.item.classList.add('list-group-item-success');
                }

            });
        }
    };
    window.createTodoApp = createTodoApp;
})();