export default function showBasket() {
    const basketBtn = document.querySelector('.header__user-btn');
    const basketElement = document.querySelector('.basket');
    basketBtn.addEventListener('click', () => {
        basketElement.classList.toggle('basket--active');
    })
    const basketCount = document.querySelector('.header__user-count');
    basketCount.textContent = 0;
}