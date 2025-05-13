import showTooltips from "./Tooltips.js";
import basket from "./Basket.js";

export default function renderCards(data, list) {
  list.innerHTML = '';
  data.forEach(element => {
    const itemEl = document.createElement('li');
    itemEl.classList.add('catalog__item');
    itemEl.innerHTML = `
        <div class="product-card">
          <div class="product-card__visual">
            <img class="product-card__img" src="${element.image}" height="436" width="290"
               alt="Изображение товара">
            <div class="product-card__more">
              <button class="product-card__link btn btn--icon" data-id="${element.id}">
                <span class="btn__text" >В корзину</span>
                <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
                </svg>
              </button>
                <a href="#" class="product-card__link btn btn--secondary">
                <span class="btn__text">Подробнее</span>
                </a>
            </div>
          </div>
          <div class="product-card__info">
            <h2 class="product-card__title">${element.name}(Artelamp)</h2>
            <span class="product-card__old">
            <span class="product-card__old-number">${element.price.old}</span>
            <span class="product-card__old-add">₽</span>
            </span>
            <span class="product-card__price">
            <span class="product-card__price-number">${element.price.new}</span>
            <span class="product-card__price-add">₽</span>
            </span> 
            <div class="product-card__tooltip tooltip">
              <button class="tooltip__btn" aria-label="Показать подсказку">
                <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                  <use xlink:href="images/sprite.svg#icon-i"></use>
                </svg>
              </button>
              <div class="tooltip__content">
                <span class="tooltip__text">Наличие товара по городам:</span>
                <ul class="tooltip__list">
                  <li class="tooltip__item">
                    <span class="tooltip__text">Москва: <span class="tooltip__count">${element.availability.moscow}</span></span>                                                                  
                  </li>
                  <li class="tooltip__item">
                    <span class="tooltip__text">Оренбург: <span class="tooltip__count">${element.availability.orenburg}</span></span>
                  </li>
                  <li class="tooltip__item">
                    <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${element.availability.saintPetersburg}</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        `;

    list.append(itemEl);
    const btnToBusket = itemEl.querySelector('.product-card__link');
    btnToBusket.addEventListener('click', () => {
      basket(element.name, element.price.new, element.image);
    })
  })

  showTooltips(list);

}