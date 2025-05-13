import pagination from "./Pagination.js";
export default function sortCards(data) {
    const catalogSelect = document.querySelector('.catalog__sort-select');

    catalogSelect.addEventListener('change', () => {
        sortData(data);
    })

    function sortData(data) {
        data.sort((a, b) => {
            switch (catalogSelect.value) {
                case 'price-min':
                    return a.price.new - b.price.new;
                case 'price-max':
                    return b.price.new - a.price.new;
                case 'rating-max':
                    return a.rating - b.rating;
                default:
                    return a.rating - b.rating;
            }
        });
        pagination(data)
    }
    sortData(data);
}