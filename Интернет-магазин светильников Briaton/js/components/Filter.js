import getData from "./GetData.js"
import sortCards from "./Sort.js";

export default function filter(data) {
    sortCards(data);
    const catalogForm = document.querySelector('.catalog-form__list-col');
    const resetFilterBtn = document.querySelector('.catalog-form__reset');
    resetFilterBtn.addEventListener('click', () => {
        getData();
    })

    const checkboxElements = catalogForm.querySelectorAll('.custom-checkbox__field');
    const statusForm = document.querySelector('.catalog-form__list-row');
    const radioElements = statusForm.querySelectorAll('.custom-radio__field');
    const applyFilters = () => {
        const checkedCheckboxes = Array.from(catalogForm.querySelectorAll('input:checked'))
            .map(checkbox => checkbox.value);
        const checkedRadio = statusForm.querySelector('input:checked');
        let filteredData = data;

        if (checkedCheckboxes.length > 0) {
            filteredData = filteredData.filter(item => item.type.some(type => checkedCheckboxes.includes(type)));
        }

        if (checkedRadio) {
            if (checkedRadio.value === 'instock') {
                filteredData = filteredData.filter(item =>
                    item.availability.moscow !== 0 &&
                    item.availability.orenburg !== 0 &&
                    item.availability.saintPetersburg !== 0
                );
            }
        }
        sortCards(filteredData);
    }

    checkboxElements.forEach((el) => {
        el.addEventListener('change', applyFilters);
    })

    radioElements.forEach(el => {
        el.addEventListener('change', applyFilters);
    })

}