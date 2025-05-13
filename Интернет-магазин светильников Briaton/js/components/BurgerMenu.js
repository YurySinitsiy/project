export default function burgerMenu() {
    const openCatalogBtn = document.querySelector('.header__catalog-btn');
    const closeCatalogBtn = document.querySelector('.main-menu__close');
    const mainMenu = document.querySelector('.main-menu');
    openCatalogBtn.addEventListener('click', () => {
        mainMenu.classList.add('main-menu--active');
    })
    closeCatalogBtn.addEventListener('click', () => {
        mainMenu.classList.remove('main-menu--active');
    })
}