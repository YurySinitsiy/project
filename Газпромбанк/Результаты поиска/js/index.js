const header = document.querySelector('.header');
const searchBtn = document.querySelector('.header__search');

searchBtn.addEventListener('click', function () {
    header.classList.toggle("header--search-active")
})