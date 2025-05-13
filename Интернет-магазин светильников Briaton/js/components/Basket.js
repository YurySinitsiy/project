export default function basket(title, price, img) {
    const basketCount = document.querySelector('.header__user-count')
    const basketEmptyBlock = document.querySelector('.basket__empty-block');
    const basketList = document.querySelector('.basket__list');
    const basketItem = document.createElement('li');
    basketItem.classList.add('basket__item');
    basketItem.innerHTML = `
        <li class="basket__item">
            <div class="basket__img">
                <img src="${img}" alt="Фотография товара" height="60" width="60">
            </div>
            <span class="basket__name">${title}</span>
            <span class="basket__price">${price}</span>
            <button class="basket__item-close" type="button">
                <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </li>
      `;
    basketList.append(basketItem);
    const closeItemInBasket = basketItem.querySelector('.basket__item-close');
    const goToBuyProductsBtn = document.querySelector('.basket__link');
    closeItemInBasket.addEventListener('click', () => {
        basketCount.textContent = --basketCount.textContent;
        basketItem.remove();
        if (basketCount.textContent === '0') {
            basketEmptyBlock.style.display = 'block';
            goToBuyProductsBtn.style.display = 'none';
        }
    })

    basketCount.textContent = ++basketCount.textContent;
    basketEmptyBlock.style.display = 'none';
    if (basketCount.textContent >= '1') {
        goToBuyProductsBtn.style.display = 'flex'
    }
}