(() => {

    //*Создаем функцию для записи студентов в LocalStorage
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

    function readDataFromLocalStorage(key) {
        return jsonToData(localStorage.getItem(key));
    }
    ////////////////////////////////////////

    //* Создаем форму для добавления студентов
    function createAddStudentForm() {
        const createForm = document.createElement('form');
        createForm.classList.add('form-group', 'd-none');

        const nameLabel = document.createElement('label'); // Имя
        nameLabel.textContent = 'Имя студента: ';
        const nameInput = document.createElement('input');
        nameInput.classList.add('form-control');
        nameInput.setAttribute('type', 'text', );
        nameInput.setAttribute('name', 'name');
        nameInput.setAttribute('placeholder', 'Имя студента');

        const familyLabel = document.createElement('label'); // Фамилия
        familyLabel.textContent = 'Фамилия студента: ';
        const familyInput = document.createElement('input');
        familyInput.classList.add('form-control');
        familyInput.setAttribute('type', 'text');
        familyInput.setAttribute('name', 'family');
        familyInput.setAttribute('placeholder', 'Фамилия студента');

        const middleNameLabel = document.createElement('label');
        middleNameLabel.textContent = 'Отчество студента: '; // Отчество
        const middleNameInput = document.createElement('input');
        middleNameInput.classList.add('form-control');
        middleNameInput.setAttribute('type', 'text');
        middleNameInput.setAttribute('name', 'middleName');
        middleNameInput.setAttribute('placeholder', 'Отчество студента');

        const facultyLabel = document.createElement('label');
        facultyLabel.textContent = 'Факультет: ';
        const facultyInput = document.createElement('input');
        facultyInput.classList.add('form-control');
        facultyInput.setAttribute('type', 'text');
        facultyInput.setAttribute('name', 'faculty');
        facultyInput.setAttribute('placeholder', 'Факультет');

        const dateOfBirhLabel = document.createElement('label');
        dateOfBirhLabel.textContent = 'Дата рождения: ';
        const dateOfBirthInput = document.createElement('input');
        dateOfBirthInput.classList.add('form-control');
        dateOfBirthInput.setAttribute('type', 'date');
        dateOfBirthInput.setAttribute('name', 'dateOfBirth');

        const yearsOfStudyLabel = document.createElement('label');
        yearsOfStudyLabel.textContent = 'Год обучения: ';
        const yearsOfStudyInput = document.createElement('input');
        yearsOfStudyInput.classList.add('form-control', 'mb-5');
        yearsOfStudyInput.setAttribute('type', 'number');
        yearsOfStudyInput.setAttribute('name', 'yearsOfStudy');
        //yearsOfStudyInput.setAttribute('min', '2000');
        //yearsOfStudyInput.setAttribute('max', '2025');
        yearsOfStudyInput.setAttribute('value', '2000')

        const btnWrap = document.createElement('div');
        btnWrap.classList.add('d-flex', 'flex-column', 'justify-content-center');

        const formButton = document.createElement('button');
        formButton.textContent = 'Добавить студента';
        formButton.classList.add('btn', 'btn-primary', 'btn-block');

        createForm.append(nameLabel, nameInput, familyLabel, familyInput, middleNameLabel,
            middleNameInput, facultyLabel, facultyInput, dateOfBirhLabel, dateOfBirthInput,
            yearsOfStudyLabel, yearsOfStudyInput, btnWrap);
        btnWrap.append(formButton);
        return {
            createForm,
            nameLabel,
            nameInput,
            familyLabel,
            familyInput,
            middleNameLabel,
            middleNameInput,
            facultyLabel,
            facultyInput,
            dateOfBirhLabel,
            dateOfBirthInput,
            yearsOfStudyLabel,
            yearsOfStudyInput,
            btnWrap,
            formButton,
        }
    }

    //* Создаем кнопку для появления формы добавления студента
    function openCreateStudentForm() {
        let openCreateStudentFormButton = document.createElement('button');
        openCreateStudentFormButton.textContent = 'Добавить студента';
        openCreateStudentFormButton.classList.add('btn', 'btn-primary', 'btn-block');

        return openCreateStudentFormButton;
    }
    //* Функция вычисления возраста
    function getStudentAge(studentDateOfBirth) {
        const studentAge = Math.floor(Math.abs(new Date() - new Date(studentDateOfBirth)) / (1000 * 60 * 60 * 24 * 365));
        // лет/год/года
        let year;
        let count = studentAge % 100;
        if (count >= 5 && count <= 20) {
            year = 'лет'
        } else {
            count = count % 10;
            if (count === 1) {
                year = 'год';
            } else if (count >= 2 && count <= 4) {
                year = 'года';
            } else {
                year = 'лет';
            }
        }
        const fullStudentAge = studentAge + ' ' + year;
        return fullStudentAge
    };

    //*Функция вычисления курса студента
    function getStudentCourse(studentYearsOfStudy) {
        const studentYearOfGraduation = Number(studentYearsOfStudy) + 4;
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear();
        let studentCourse;
        if (currentMonth <= 8 && currentYear <= studentYearOfGraduation) {
            studentCourse = Math.abs(currentYear - studentYearsOfStudy) + ' курс';
        } else {
            studentCourse = 'Закончил';
        }
        return studentCourse
    }

    //* Создаем массив студентов
    const studentsArr = readDataFromLocalStorage('studentsArr') || [{
            name: 'Иван',
            family: 'Иванов',
            middleName: 'Иванович',
            faculty: 'Факультет 1',
            dateOfBirthAndAge: '1992, 12, 19',
            yearsOfStudy: '2000'
        },
        {
            name: 'Петр',
            family: 'Петров',
            middleName: 'Петрович',
            faculty: 'Факультет 2',
            dateOfBirthAndAge: '1993, 2, 5',
            yearsOfStudy: '2010'
        },
        {
            name: 'Сергей',
            family: 'Сергеев',
            middleName: 'Сергеевич',
            faculty: 'Факультет 3',
            dateOfBirthAndAge: '1994, 8, 15',
            yearsOfStudy: '2020'
        },
        {
            name: 'Виктор',
            family: 'Викторов',
            middleName: 'Викторович',
            faculty: 'Факультет 4',
            dateOfBirthAndAge: '1995, 6, 22',
            yearsOfStudy: '2024'
        },
        {
            name: 'Андрей',
            family: 'Андреев',
            middleName: 'Андреевич',
            faculty: 'Факультет 5',
            dateOfBirthAndAge: '1990, 2, 23',
            yearsOfStudy: '2022'
        },

    ]

    //* Функция смены формата даты
    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return day + '.' + month + '.' + year;
    }

    //*Создаем функцию вызова студента в таблицу
    function addStudentToPanel(arr) {
        const container = document.querySelector('.container');
        const table = document.querySelector('table');
        const tbody = document.createElement('tbody');
        tbody.classList.add('tbody-students');
        const form = createAddStudentForm();

        container.append(form.createForm);
        table.append(tbody)

        let openCreateStudentFormButton = openCreateStudentForm();
        container.append(openCreateStudentFormButton);

        openCreateStudentFormButton.addEventListener('click', () => {
            form.createForm.classList.remove('d-none');
            openCreateStudentFormButton.classList.add('d-none');
            //console.log(studentsArr)
        });

        form.createForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const studentName = form.nameInput.value.trim();
            const studentFamily = form.familyInput.value.trim();
            const studentMiddleName = form.middleNameInput.value.trim();
            const studentFaculty = form.facultyInput.value.trim();
            const studentDateOfBirth = form.dateOfBirthInput.value;
            const studentYearsOfStudy = form.yearsOfStudyInput.value;


            //* Валидация поля ввода Имени
            let studentNameError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentNameError) {
                studentNameError.remove();
            }

            if (!studentName) {
                studentNameError = document.createElement('span');
                studentNameError.classList.add('text-danger');
                studentNameError.textContent = 'Введите имя студента';
                form.btnWrap.prepend(studentNameError);
                return;
            }

            //* Валидация поля ввода фамилии
            let studentFamilyError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentFamilyError) {
                studentFamilyError.remove();
            }
            if (!studentFamily) {
                studentFamilyError = document.createElement('span');
                studentFamilyError.classList.add('text-danger');
                studentFamilyError.textContent = 'Введите фамилию студента';
                form.btnWrap.prepend(studentFamilyError);
                return;
            }

            //* Валидация поля ввода отчества
            let studentMiddleNameError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentMiddleNameError) {
                studentMiddleNameError.remove();
            }
            if (!studentMiddleName) {
                studentMiddleNameError = document.createElement('span');
                studentMiddleNameError.classList.add('text-danger');
                studentMiddleNameError.textContent = 'Введите отчество студента';
                form.btnWrap.prepend(studentMiddleNameError);
                return;
            }

            //* Валидация поля ввода факультета
            let studentFacultyError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentFacultyError) {
                studentFacultyError.remove();
            }

            if (!studentFaculty) {
                studentFacultyError = document.createElement('span');
                studentFacultyError.classList.add('text-danger');
                studentFacultyError.textContent = 'Введите факультет студента';
                form.btnWrap.prepend(studentFacultyError);
                return;
            }

            //* Валидация даты рождения
            let studentDateOfBirthError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentDateOfBirthError) {
                studentDateOfBirthError.remove();
            }

            if (!studentDateOfBirth) {
                studentDateOfBirthError = document.createElement('span');
                studentDateOfBirthError.classList.add('text-danger');
                studentDateOfBirthError.textContent = 'Введите дату рождения студента';
                form.btnWrap.prepend(studentDateOfBirthError);
                return;
            }
            if (new Date(studentDateOfBirth) < new Date('01/01/1900') || new Date(studentDateOfBirth) > new Date()) {
                studentDateOfBirthError = document.createElement('span');
                studentDateOfBirthError.classList.add('text-danger');
                studentDateOfBirthError.textContent = 'Введите корректную дату рождения студента';
                form.btnWrap.prepend(studentDateOfBirthError);
                return;
            }

            //* Валидация поля ввода года обучения
            let studentYearsOfStudyError = form.btnWrap.querySelector('.text-danger'); // Удаляем сообщение об ошибке, если оно есть
            if (studentYearsOfStudyError) {
                studentYearsOfStudyError.remove();
            }
            if (!studentYearsOfStudy) {
                studentYearsOfStudyError = document.createElement('span');
                studentYearsOfStudyError.classList.add('text-danger');
                studentYearsOfStudyError.textContent = 'Введите год обучения студента';
                form.btnWrap.prepend(studentYearsOfStudyError);
                return;
            }
            if (studentYearsOfStudy < 2000 || studentYearsOfStudy > (new Date().getFullYear())) {
                studentYearsOfStudyError = document.createElement('span');
                studentYearsOfStudyError.classList.add('text-danger');
                studentYearsOfStudyError.textContent = 'Введите корректный год обучения студента';
                form.btnWrap.prepend(studentYearsOfStudyError);
                return;
            }


            arr.push({
                name: studentName,
                family: studentFamily,
                middleName: studentMiddleName,
                faculty: studentFaculty,
                dateOfBirthAndAge: `${studentDateOfBirth} (${getStudentAge(studentDateOfBirth)})`,
                yearsOfStudy: `${studentYearsOfStudy}`,
            });

            saveDataToLocalStorage('studentsArr', studentsArr);

            // Очищаем таблицу перед добавлением новых студентов
            tbody.innerHTML = '';

            addStudentsToTable(arr, tbody);
            //console.log(studentsArr)

            //Обнуляем значания в полях, чтобы не пришлось стирать вручную
            form.nameInput.value = '';
            form.familyInput.value = '';
            form.middleNameInput.value = ''
            form.facultyInput.value = '';
            form.dateOfBirthInput.value = '';
            form.yearsOfStudyInput.value = '';


            form.createForm.classList.add('d-none');
            openCreateStudentFormButton.classList.remove('d-none');
        });

        addStudentsToTable(studentsArr, tbody);

        //* Создаем функцию сортировки 
        const sortUsers = (arr, prop, dir) => arr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1);

        let dir = false;
        // Сортировка по Фамилии
        const tableHeadName = document.querySelector('#fullName');
        const tableHeadFaculty = document.querySelector('#faculty');
        const tableHeadbirthdayDate = document.querySelector('#birthdayDate');
        const tableHeadyearOfStudy = document.querySelector('#yearOfStudy');
        // Сортировка по имени
        tableHeadName.addEventListener('click', () => {
            sortUsers(studentsArr, 'name', dir);
            tbody.innerHTML = ''; // Очищаем таблицу перед добавлением отсортированных студентов
            addStudentsToTable(studentsArr, tbody);
            dir = !dir; // Меняем направление сортировки
        });
        // Сортировка по факуьтету
        tableHeadFaculty.addEventListener('click', () => {
            sortUsers(studentsArr, 'faculty', dir);
            tbody.innerHTML = ''; // Очищаем таблицу перед добавлением отсортированных студентов
            addStudentsToTable(studentsArr, tbody);
            dir = !dir; // Меняем направление сортировки
        });
        // Сортировка по дате рождения
        tableHeadbirthdayDate.addEventListener('click', () => {
            sortUsers(studentsArr, 'dateOfBirthAndAge', dir);
            tbody.innerHTML = ''; // Очищаем таблицу перед добавлением отсортированных студентов
            addStudentsToTable(studentsArr, tbody);
            dir = !dir; // Меняем направление сортировки
        });
        // Сортировка по годам обучения
        tableHeadyearOfStudy.addEventListener('click', () => {
            sortUsers(studentsArr, 'yearsOfStudy', dir);
            tbody.innerHTML = ''; // Очищаем таблицу перед добавлением отсортированных студентов
            addStudentsToTable(studentsArr, tbody);
            dir = !dir; // Меняем направление сортировки
        });

    };

    addStudentToPanel(studentsArr)

    function addStudentsToTable(arr, tbody) {
        for (let i = 0; i < arr.length; i++) {
            const row = document.createElement('tr');
            tbody.append(row);
            const studentNameCell = document.createElement('td');
            studentNameCell.classList.add('text-center');
            studentNameCell.textContent = arr[i].family + ' ' + arr[i].name + ' ' + arr[i].middleName;

            const studentFacultyCell = document.createElement('td');
            studentFacultyCell.classList.add('text-center');
            studentFacultyCell.textContent = arr[i].faculty;

            const studentDateOfBirthAndAgeCell = document.createElement('td');
            studentDateOfBirthAndAgeCell.classList.add('text-center');
            studentDateOfBirthAndAgeCell.textContent = (formatDate(arr[i].dateOfBirthAndAge)) + ' ' + '(' + (getStudentAge(arr[i].dateOfBirthAndAge)) + ')';


            const studentYearsOfStudyCell = document.createElement('td');
            studentYearsOfStudyCell.classList.add('text-center');
            studentYearsOfStudyCell.textContent = ` ${Number(arr[i].yearsOfStudy)} - ${(Number(arr[i].yearsOfStudy) + 4)} (${(getStudentCourse(arr[i].yearsOfStudy))})`;

            row.append(studentNameCell, studentFacultyCell, studentDateOfBirthAndAgeCell, studentYearsOfStudyCell);
        }

    }

    //* Фильтрация
    function filter(arr, prop, value) {
        let result = [],
            copy = [...arr]
        for (const item of copy) {
            if (String(item[prop]).includes(String(value))) result.push(item);
        }
        return result
    }

    function renderAfterFilter(arr) {
        const tbody = document.querySelector('.tbody-students');
        tbody.innerHTML = ''; // Очищаем таблицу перед добавлением отсортированных студентов
        const fioValue = document.querySelector('#fio-input').value,
            facultyValue = document.querySelector('#faculty-input').value,
            startValue = document.querySelector('#start-input').value,
            endValue = document.querySelector('#end-input').value;

        let newArr = [...arr]
        if (fioValue !== '') {
            newArr = newArr.filter(student =>
                student.name.includes(fioValue) ||
                student.family.includes(fioValue) ||
                student.middleName.includes(fioValue)
            );
        }
        if (facultyValue !== '') newArr = filter(newArr, 'faculty', facultyValue);
        if (startValue !== '') newArr = newArr.filter(student => student.yearsOfStudy.includes(startValue));
        if (endValue !== '') newArr = newArr.filter(student => (Number(student.yearsOfStudy) + 4).toString().includes(endValue));

        addStudentsToTable(newArr, tbody);
    }

    const filterForm = document.querySelector('#filter-form');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        renderAfterFilter(studentsArr)
    });

})();