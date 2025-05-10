import saveNewClient from "./SaveNewClient.js"
import deleteClientById from "./DeleteClientById.js"
import editClientById from "./EditClientById.js"

function createWrapper() {
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('client-modal__wrapper');
    return modalWrapper;
}

function createTitle(title) {
    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('client-modal__title');
    modalTitle.textContent = title;
    return modalTitle;
}

function createCloseButton(wrapper, section) {
    const closeButton = document.createElement('button');
    closeButton.classList.add('client-modal__button-close');
    closeButton.addEventListener('click', () => {
        wrapper.remove();
        section.classList.remove('clients--active');
    })
    return closeButton
}

function createForm(wrapper, section) {
    //* Форма
    const form = document.createElement('form');
    form.classList.add('client-modal__form');
    form.setAttribute('action', 'POST');


    //* Обертка контактов
    const addContactsInner = document.createElement('div');
    addContactsInner.classList.add('client-modal__inner');

    //* Кнопка добавления контакта
    const addContactsButton = document.createElement('button');
    addContactsButton.setAttribute('type', 'button');
    addContactsButton.classList.add('client-modal__button');
    addContactsButton.classList.add('btn');
    addContactsButton.innerHTML = `
            <svg class="client__button-icon" width="16" height="16" aria-hidden="true">
                <use xlink:href="images/sprite.svg#plus-icon"></use>
            </svg>
            Добавить контакт
        `
    let newContact
    addContactsButton.addEventListener('click', () => {
        newContact = addContact()
        addContactsInner.prepend(newContact)
        contactsValidate(newContact, validate)
    })

    //*Кнопка сохранить
    const saveButton = document.createElement('button');
    saveButton.classList.add('client-modal__button-save');
    saveButton.classList.add('btn');
    saveButton.classList.add('btn--primary');
    saveButton.setAttribute('type', 'submit');
    saveButton.textContent = 'Сохранить';

    form.addEventListener('submit', (e) => {
        validate
        e.preventDefault()
    })

    addContactsInner.append(addContactsButton)
    form.append(createSurname(), createName(), createLastName(), addContactsInner, saveButton)

    //*Валидация

    const validate = new JustValidate(form);
    validate.addField('#surname', [{
            rule: 'required',
            errorMessage: 'Это поле обязательно для заполнения',
        }, {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина 3 символа',
        }, {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина 20 символов',
        }

    ])
    validate.addField('#name', [{
            rule: 'required',
            errorMessage: 'Это поле обязательно для заполнения',
        }, {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина 3 символа',
        }, {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина 20 символов',
        }


    ])

    validate.onSuccess(() => {
        saveNewClient();
        wrapper.remove();
        section.classList.remove('clients--active');
    })

    return form
}

function createSurname() {
    const inputSurnameWrapper = document.createElement('div');
    inputSurnameWrapper.classList.add('custom-input')
    inputSurnameWrapper.classList.add('custom-input--clients')
    const inputSurname = document.createElement('input');
    inputSurname.classList.add('custom-input__field');
    inputSurname.setAttribute('name', 'surname');
    inputSurname.setAttribute('type', 'text');
    inputSurname.setAttribute('id', 'surname');
    const inputSurnamePlaceholder = document.createElement('span');
    inputSurnamePlaceholder.classList.add('custom-input__placeholder');
    inputSurnamePlaceholder.textContent = 'Фамилия';

    const inputSurnamePlaceholderStar = document.createElement('span');
    inputSurnamePlaceholderStar.classList.add('custom-input__placeholder--star');
    inputSurnamePlaceholderStar.textContent = '*';
    inputSurnamePlaceholder.append(inputSurnamePlaceholderStar)
    inputSurnameWrapper.append(inputSurname, inputSurnamePlaceholder)

    inputSurname.addEventListener('input', (e) => {
        if (e.target.value) {
            inputSurnamePlaceholder.style.display = 'none';
        } else {
            inputSurnamePlaceholder.style.display = 'inline';
        }
    })

    return inputSurnameWrapper;
}

function createName() {
    const inputNameWrapper = document.createElement('div');
    inputNameWrapper.classList.add('custom-input')
    inputNameWrapper.classList.add('custom-input--clients')
    const inputName = document.createElement('input');
    inputName.classList.add('custom-input__field');
    inputName.setAttribute('name', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'name');
    const inputNamePlaceholder = document.createElement('span');
    inputNamePlaceholder.classList.add('custom-input__placeholder');
    inputNamePlaceholder.textContent = 'Имя';

    const inputNamePlaceholderStar = document.createElement('span');
    inputNamePlaceholderStar.classList.add('custom-input__placeholder--star');
    inputNamePlaceholderStar.textContent = '*';
    inputNamePlaceholder.append(inputNamePlaceholderStar)
    inputNameWrapper.append(inputName, inputNamePlaceholder);

    inputName.addEventListener('input', (e) => {
        if (e.target.value) {
            inputNamePlaceholder.style.display = 'none';
        } else {
            inputNamePlaceholder.style.display = 'inline';
        }
    })
    return inputNameWrapper;
}

function createLastName() {
    const inputLastNameWrapper = document.createElement('div');
    inputLastNameWrapper.classList.add('custom-input')
    inputLastNameWrapper.classList.add('custom-input--clients')
    const inputLastName = document.createElement('input');
    inputLastName.classList.add('custom-input__field');
    inputLastName.setAttribute('name', 'last-name');
    inputLastName.setAttribute('type', 'text');
    inputLastName.setAttribute('id', 'last-name');

    const inputLastNamePlaceholder = document.createElement('span');
    inputLastNamePlaceholder.classList.add('custom-input__placeholder');
    inputLastNamePlaceholder.textContent = 'Отчество';
    inputLastNameWrapper.append(inputLastName, inputLastNamePlaceholder)

    inputLastName.addEventListener('input', (e) => {
        if (e.target.value) {
            inputLastNamePlaceholder.style.display = 'none';
        } else {
            inputLastNamePlaceholder.style.display = 'inline';
        }
    })

    return inputLastNameWrapper;
}

function contactsValidate(newContact, validate) {
    const input = newContact.querySelector('.client-modal__subform-input');
    const select = newContact.querySelector('.client-modal__subform-select');
    validate.addField(input, [{
            rule: 'number',
            errorMessage: 'Некорректный номер телефона',
        },
        {
            rule: 'required',
            errorMessage: 'Это поле обязательно для заполнения',
        }, {
            rule: 'minLength',
            value: 13,
            errorMessage: 'Минимальная длина 13 символа',
        }, {
            rule: 'maxLength',
            value: 13,
            errorMessage: 'Максимальная длина 13 символов',
        }
    ]);

    select.addEventListener('change', () => {
        // console.log(input.type);
        if (input.type == 'email') {
            validate.addField(input, [{
                    rule: 'email',
                    errorMessage: 'Некорректный адрес электронной почты',
                },
                {
                    rule: 'required',
                    errorMessage: 'Это поле обязательно для заполнения',
                }, {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Минимальная длина 3 символа',
                }, {
                    rule: 'maxLength',
                    value: 20,
                    errorMessage: 'Максимальная длина 20 символов',
                }
            ])
        } else if (input.type == 'tel') {
            validate.addField(input, [{
                    rule: 'number',
                    errorMessage: 'Некорректный номер телефона',
                },
                {
                    rule: 'required',
                    errorMessage: 'Это поле обязательно для заполнения',
                }, {
                    rule: 'minLength',
                    value: 13,
                    errorMessage: 'Минимальная длина 13 символа',
                }, {
                    rule: 'maxLength',
                    value: 13,
                    errorMessage: 'Максимальная длина 13 символов',
                }
            ])
        } else {
            validate.addField(input, [{
                rule: 'required',
                errorMessage: 'Это поле обязательно для заполнения',
            }, {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Минимальная длина 3 символа',
            }, {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимальная длина 20 символов',
            }])
        }
    })
}

function editContactsValidate(input, validate) {
    if (input.type == 'email') {
        validate.addField(input, [{
                rule: 'email',
                errorMessage: 'Некорректный адрес электронной почты',
            },
            {
                rule: 'required',
                errorMessage: 'Это поле обязательно для заполнения',
            }, {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Минимальная длина 3 символа',
            }, {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Максимальная длина 20 символов',
            }
        ])
    } else if (input.type == 'tel') {
        validate.addField(input, [{
                rule: 'number',
                errorMessage: 'Некорректный номер телефона',
            },
            {
                rule: 'required',
                errorMessage: 'Это поле обязательно для заполнения',
            }, {
                rule: 'minLength',
                value: 13,
                errorMessage: 'Минимальная длина 13 символа',
            }, {
                rule: 'maxLength',
                value: 13,
                errorMessage: 'Максимальная длина 13 символов',
            }
        ])
    } else {
        validate.addField(input, [{
            rule: 'required',
            errorMessage: 'Это поле обязательно для заполнения',
        }, {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина 3 символа',
        }, {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина 20 символов',
        }]);
    }
}

function createCancelButton(wrapper, section) {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('client-modal__button-cancel');
    cancelButton.classList.add('btn');
    cancelButton.textContent = 'Отмена';
    cancelButton.addEventListener('click', () => {
        wrapper.remove();
        section.classList.remove('clients--active');
    })

    return cancelButton
}

function addContact() {
    const formWrapper = document.createElement('div');
    formWrapper.classList.add('client-modal__subform-wrapper');

    const select = document.createElement('select');
    select.classList.add('client-modal__subform-select');
    const phoneOption = new Option('Телефон', 'phone', true, true);
    const secondPhoneOption = new Option('Доп.телефон', 'phone');
    const emailOption = new Option('Email', 'email');
    const vkOption = new Option('VK', 'vk');
    const fbOption = new Option('Facebook', 'fb');
    const otherOption = new Option('Другое', 'other');

    const input = document.createElement('input');
    input.classList.add('client-modal__subform-input');
    input.setAttribute('required', '')
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Введите данные контакта');

    const resetButton = document.createElement('button');
    resetButton.classList.add('client-modal__subform-reset');
    resetButton.classList.add('btn');
    resetButton.setAttribute('type', 'reset');
    resetButton.setAttribute('aria-label', 'Кнопка сброса');
    input.addEventListener('input', () => {
        if (!formWrapper.querySelector('.client-modal__subform-reset')) {
            if (input.value.length > 0) {
                formWrapper.append(resetButton)
            } else {
                formWrapper.removeChild(resetButton)
            }
        }
    })

    select.addEventListener('change', () => {
        if (select.value === 'phone') {
            input.setAttribute('type', 'tel');
        } else if (select.value === 'email') {
            input.setAttribute('type', 'email');
        } else {
            input.setAttribute('type', 'text');
        }

    })

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('client-modal__subform-delete');
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('aria-label', 'Кнопка удалить контакт');
    deleteButton.addEventListener('click', () => {
        formWrapper.remove();
        const addButton = document.querySelector('.client-modal__button');
        if (formWrapperArray.length >= 9) {
            addButton.setAttribute('disabled', '');
        } else {
            addButton.removeAttribute('disabled', '')
        }
    })

    resetButton.addEventListener('click', () => {
        input.value = '';
        resetButton.remove()
    })

    const formWrapperArray = Array.from(document.querySelectorAll('.client-modal__subform-wrapper'));
    const addButton = document.querySelector('.client-modal__button');
    if (formWrapperArray.length >= 9) {
        addButton.setAttribute('disabled', '');
    } 


    select.append(phoneOption, secondPhoneOption, emailOption, vkOption, fbOption, otherOption)
    formWrapper.append(select, input);
    formWrapper.prepend(deleteButton);

    const choices = new Choices(select, {
        searchEnabled: false,
        shouldSortItems: false,
        itemSelectText: ""
    })

    tippy(deleteButton, {
        content: 'Удалить контакт',
        theme: "new-style"
    });

    return formWrapper

}

function deleteWarning() {
    const warning = document.createElement('p');
    warning.classList.add('client-modal__warning');
    warning.textContent = 'Вы уверены, что хотите удалить клиента?';
    return warning
}

function createDeleteButton(wrapper, section, id) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('client-modal__button-save');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn--primary');
    deleteButton.setAttribute('type', 'button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
        wrapper.remove();
        section.classList.remove('clients--active');
        deleteClientById(id)
    });
    return deleteButton
}

function createFormEditClient(wrapper, section, data) {
    //* Форма
    const form = document.createElement('form');
    form.classList.add('client-modal__form');
    form.setAttribute('action', 'POST');

    //* Обертка контактов
    const addContactsInner = document.createElement('div');
    addContactsInner.classList.add('client-modal__inner');

    //* Кнопка добавления контакта
    const addContactsButton = document.createElement('button');
    addContactsButton.setAttribute('type', 'button');
    addContactsButton.classList.add('client-modal__button');
    addContactsButton.classList.add('btn');
    addContactsButton.innerHTML = `
            <svg class="client__button-icon" width="16" height="16" aria-hidden="true">
                <use xlink:href="images/sprite.svg#plus-icon"></use>
            </svg>
            Добавить контакт
        `
    let newContact
    addContactsButton.addEventListener('click', () => {
        newContact = addContact()
        addContactsInner.prepend(newContact)
        contactsValidate(newContact, validate)
    })

    //*Кнопка сохранить
    const saveButton = document.createElement('button');
    saveButton.classList.add('client-modal__button-save');
    saveButton.classList.add('btn');
    saveButton.classList.add('btn--primary');
    saveButton.setAttribute('type', 'submit');
    saveButton.textContent = 'Сохранить';

    form.addEventListener('submit', (e) => {
        validate
        e.preventDefault()
    })

    addContactsInner.append(addContactsButton)
    form.append(createSurname(), createName(), createLastName(), addContactsInner, saveButton)

    getInputValue('#surname', form, data.surname)
    getInputValue('#name', form, data.name)
    getInputValue('#last-name', form, data.lastName)


    //*Валидация
    const validate = new JustValidate(form);
    validate.addField('#surname', [{
            rule: 'required',
            errorMessage: 'Это поле обязательно для заполнения',
        }, {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина 3 символа',
        }, {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина 20 символов',
        }

    ])
    validate.addField('#name', [{
        rule: 'required',
        errorMessage: 'Это поле обязательно для заполнения',
    }, {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимальная длина 3 символа',
    }, {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимальная длина 20 символов',
    }])
    //*Наличие контактов
    //console.log(data.contacts);
    if (data.contacts.length > 0) {
        for (let i = 0; i < data.contacts.length; i++) {
            newContact = addContact()
            addContactsInner.prepend(newContact)

        }
    }
    for (let i = 0; i < data.contacts.length; i++) {
        const input = addContactsInner.querySelectorAll('.client-modal__subform-input');
        input[i].value = data.contacts[i].value;

        const select = addContactsInner.querySelectorAll('.client-modal__subform-select')[i].options.item(0);
        select.value = data.contacts[i].type;

        const selectOptionText = addContactsInner.querySelectorAll('.client-modal__subform-wrapper')[i].querySelector('.choices__item')
        if (select.value == 'email') {
            selectOptionText.textContent = 'Email';
        } else if (select.value == 'phone') {
            selectOptionText.textContent = 'Телефон';
        } else if (select.value == 'fb') {
            selectOptionText.textContent = 'Facebook';
        } else if (select.value == 'vk') {
            selectOptionText.textContent = 'VK';
        } else {
            selectOptionText.textContent = 'Другое';
        }

        const resetButton = document.createElement('button');
        resetButton.classList.add('client-modal__subform-reset');
        resetButton.classList.add('btn');
        resetButton.setAttribute('type', 'reset');

        if (input[i].value.length > 0) {
            addContactsInner.querySelectorAll('.client-modal__subform-wrapper')[i].append(resetButton)
        } else {
            addContactsInner.querySelectorAll('.client-modal__subform-wrapper')[i].removeChild(resetButton)
        }

        resetButton.addEventListener('click', () => {
            input[i].value = '';
            addContactsInner.querySelectorAll('.client-modal__subform-wrapper')[i].removeChild(resetButton)
        });

        editContactsValidate(input[i], validate)

        const selectValue = addContactsInner.querySelectorAll('.client-modal__subform-select')[i];
        selectValue.addEventListener('change', () => {
            editContactsValidate(input[i], validate)
        })

    }

    validate.onSuccess(() => {
        const clientObj = {
            name: form.querySelector('#name').value.trim(),
            surname: form.querySelector('#surname').value.trim(),
            lastName: form.querySelector('#last-name').value.trim(),
            contacts: getContacts()
        }
        editClientById(data.id, clientObj);
        wrapper.remove();
        section.classList.remove('clients--active');
    })

    return form
}

function getInputValue(id, wrapper, value) {
    const input = wrapper.querySelector(`${id}`);
    input.value = value
    const inputPlaceholder = input.nextElementSibling;
    if (input.value.length > 0) {
        inputPlaceholder.style.display = 'none';
    }
}

function createClientIdText(id) {
    const idText = document.createElement('span');
    idText.classList.add('client-modal__id')
    idText.textContent = `ID: ${id}`;
    return idText
}

function deleteClientButton(wrapper, section, id) {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('client-modal__button-cancel');
    cancelButton.classList.add('btn');
    cancelButton.textContent = 'Удалить клиента';
    cancelButton.addEventListener('click', () => {
        deleteClientById(id)
        wrapper.remove();
        section.classList.remove('clients--active');
    })

    return cancelButton
}

function getContacts() {
    const contacts = [];
    const inputs = document.querySelectorAll('.client-modal__subform-input');
    const selects = document.querySelectorAll('.client-modal__subform-select');

    for (let i = 0; i < inputs.length; i++) {
        const contact = {
            value: inputs[i].value,
            type: selects[i].value
        };
        contacts.push(contact);
    }

    return contacts;
}

export {
    createWrapper,
    createTitle,
    createCloseButton,
    createForm,
    createCancelButton,
    addContact,
    deleteWarning,
    createDeleteButton,
    createFormEditClient,
    createClientIdText,
    deleteClientButton,

}