import showContacts from "./ShowContacts.js"
import deleteClient from "./DeleteClient.js"
import editClient from "./EditClient.js"
export default function createClientsRow(data) {
    const tableBody = document.querySelector('.clients__table-body');
    tableBody.innerHTML = '';
    data.forEach(element => {
        const tableRow = document.createElement('tr');

        let getFormattedDate = (data) => {
            const date = new Date(data);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            return `${day}.${month}.${year}`
        }

        let getFormattedTime = (data) => {
            const date = new Date(data);
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (hours < 10) {
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            return `${hours}:${minutes}`
        }

        tableRow.classList.add('clients__table-wrapper')
        tableRow.classList.add('clients__table-wrapper--body')
        tableRow.innerHTML = `
        <td>
            <span class = "clients__id">${element.id}</span>
        </td>
        <td>
            <span class = "clients__fcs">${element.surname} ${element.name} ${element.lastName}</span>
        </td>
        <td>
            <div class="clients__date-wrapper">    
                <span class = "clients__create-date">${getFormattedDate(element.createdAt)}</span>
                <span class = "clients__create-time">${getFormattedTime(element.createdAt)}</span>
            </div>        
        </td>
        <td>
            <div class="clients__date-wrapper">    
                <span class = "clients__edit-date">${getFormattedDate(element.updatedAt)}</span>
                <span class = "clients__edit-time">${getFormattedTime(element.updatedAt)}</span>
            </div>        
        </td>
        <td>
            <div class="clients__contacts"></div>
        </td>
        <td>
            <div class="clients__btn-wrapper">
                <button class="clients__btn btn clients__btn--edit">
                    <svg class="clients__btn-icon" aria-hidden="true" width="16" height="16">
                        <use xlink:href="images/sprite.svg#edit-icon"></use>
                    </svg>
                Изменить
                </button>
                <button class="clients__btn btn clients__btn--delete">
                    <svg class="clients__btn-icon" aria-hidden="true" width="16" height="16">
                        <use xlink:href="images/sprite.svg#cancel-icon"></use>
                    </svg>
                Удалить
                </button>
            </div>
        </td>       
        `
        showContacts(element, tableRow)
        deleteClient(tableRow, element.id)
        editClient(tableRow, element.id)
        tableBody.append(tableRow)
    });
}