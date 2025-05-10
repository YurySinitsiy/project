import createClientsRow from "./CreateClientsRow.js";
export default function search(data) {
    const searchInput = document.querySelector('.custom-input__header');
    let filteredData;

    searchInput.addEventListener('input', (e) => {
        setTimeout(() => {
            const searchValue = e.target.value.trim().toLowerCase();
            filteredData = data.filter(item => {
                return Object.values(item).some(value => value.toString().toLowerCase().includes(searchValue));
            });
            createClientsRow(filteredData)
        }, 300);
    });

    searchInput.value = ''
}