import renderCards from "./RenderCards.js";
export default function slider(data) {
  const dayProductsList = document.querySelector('.day-products__list');
  const dataForSlider = data.filter(item => item.goodsOfDay == true);

  renderCards(dataForSlider, dayProductsList);

  const dayProductsItem = dayProductsList.querySelectorAll('.catalog__item');
  dayProductsItem.forEach((item) => {
    item.classList.add('day-products__item');
    item.classList.add('swiper-slide');
    const productCard = item.querySelector('.product-card');
    productCard.classList.add('product-card--small');
  })

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 4, // кол-во отображаемых слайдов
    spaceBetween: 40, // расстояние между слайдами
    // Navigation arrows
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
  });
}