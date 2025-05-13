export default function showTippy(data) {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach((tooltip, index) => {
        const tooltipContent = document.createElement('div');
        tooltipContent.classList.add('tooltip__content');
        tooltipContent.innerHTML = `
    <span class="tooltip__text">Наличие товара по городам:</span>
      <ul class="tooltip__list">
        <li class="tooltip__item">
          <span class="tooltip__text">Москва: <span class="tooltip__count">${data[index].availability.moscow}</span></span>                                                                  
        </li>
        <li class="tooltip__item">
          <span class="tooltip__text">Оренбург: <span class="tooltip__count">${data[index].availability.orenburg}</span></span>
        </li>
        <li class="tooltip__item">
          <span class="tooltip__text">Санкт-Петербург: <span class="tooltip__count">${data[index].availability.saintPetersburg}</span></span>
        </li>
      </ul>
    `
        tippy(tooltip, {
            content: tooltipContent,
            allowHTML: true,
            trigger: 'mouseenter',
            trigger: 'focusin',
            theme: 'light',
            arrow: false,
        })
    })
}