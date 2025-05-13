import openModal from "./Modal.js";

export default function postForm() {
    const questionsForm = document.querySelector('.questions__form');
    questionsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validate.validate();
    });

    const validate = new JustValidate('.questions__form');
    validate.addField('#name', [{
            rule: 'required',
            errorMessage: 'Введите ваше имя',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальное количество символов 3',
        },
        {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальное количество символов 20',
        }
    ]);

    validate.addField('#email', [{
            rule: 'required',
            errorMessage: 'Вы не ввели почту',
        },
        {
            rule: 'email',
            errorMessage: 'Неправильный формат почты',
        }
    ]);

    validate.addField('#agree', [{
        rule: 'required',
        errorMessage: 'Согласие обязательно!',
    }]);

    validate.onSuccess(function () {
        post();
    });


    async function post() {
        const formAction = questionsForm.getAttribute('action');
        try {
            const response = await fetch(formAction, {
                method: 'POST',
            });
            openModal("Заявка успешно отправлена!");
            questionsForm.reset();
        } catch (error) {
            openModal("Не удалось отправить заявку:(");
        }
    }


}