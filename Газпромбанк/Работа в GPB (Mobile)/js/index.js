const header = document.querySelector('.header');
const borgerBtn = document.querySelector('.burger');

borgerBtn.addEventListener('click', () => {
    header.classList.toggle('header--open');
})