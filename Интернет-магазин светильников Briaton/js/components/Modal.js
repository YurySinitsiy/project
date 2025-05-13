export default function openModal(message) {
    const questionsForm = document.querySelector('.questions__form');
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('message');
    modalWrapper.innerHTML = `
    <div class="message__wrapper">
        <p class="message__content">${message}</p>
        <button class="message__close"></button>
    </div>
    `;
    questionsForm.append(modalWrapper);
    const closeBtn = document.querySelector('.message__close');
    closeBtn.addEventListener('click', () => {
        modalWrapper.remove();
    })



}