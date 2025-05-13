export default function showCountInFilter(data) {
    const catalogFilterList = document.querySelector('.catalog-form__list-col');
    const checkbox = catalogFilterList.querySelectorAll('.custom-checkbox');
    checkbox.forEach(el => {
        const input = el.querySelector('.custom-checkbox__field');
        const count = el.querySelector('.custom-checkbox__count');
        count.textContent = 0;
        showCurrentQuantityInFilter(input.value, count);
    })

    function showCurrentQuantityInFilter(type, count) {
        data.forEach(element => {
            const findType = element.type.find(item => item == type);
            if (findType) {
                count.textContent = ++count.textContent;
            } else {
                count.textContent == 0;
            }
        })
    }
}