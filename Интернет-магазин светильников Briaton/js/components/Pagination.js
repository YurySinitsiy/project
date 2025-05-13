import renderCards from "./RenderCards.js";

export default function pagination(data) {
    const paginationLinksList = document.querySelector('.catalog__pagination');
    const catalogList = document.querySelector('.catalog__list');
    if (data.length <= 6) {
        renderCards(data, catalogList);
    } else {
        pagintationCards(0, 6);
    }

    paginationLinksList.innerHTML = '';
    for (let i = 1; i <= (Math.ceil(data.length / 6)); i++) {
        const paginationItem = document.createElement('li');
        paginationItem.classList.add('catalog__pagination-item')

        let paginationBtn = document.createElement('button');
        paginationBtn.classList.add('catalog__pagination-link');
        paginationBtn.textContent = i;

        paginationItem.append(paginationBtn);
        paginationLinksList.append(paginationItem);

        paginationBtn.addEventListener('click', function () {
            let start = (i - 1) * 6;
            let end = (i) * 6;
            pagintationCards(start, end);
        })
    }


    function pagintationCards(start, end) {
        renderCards(data.slice(start, end), catalogList);
    }


}