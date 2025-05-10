import createClientsRow from "./CreateClientsRow.js"

export default function sortClients(data) {
    let direction = true;
    const table = document.querySelector('.clients__table-body');
    const sortById = document.querySelector('#btn-id');
    sortById.addEventListener('click', () => {
        sort(data, 'id')
        buttonDecoration(sortById)
    })

    const sortByFullName = document.querySelector('#btn-fcs');
    sortByFullName.addEventListener('click', () => {
        sort(data, 'fullName')
        buttonDecoration(sortByFullName)
    })

    const sortByCreatedAt = document.querySelector('#btn-create-at');
    sortByCreatedAt.addEventListener('click', () => {
        sort(data, 'createdAt')
        buttonDecoration(sortByCreatedAt)
    })

    const sortByUpdatedAt = document.querySelector('#btn-edit-at');
    sortByUpdatedAt.addEventListener('click', () => {
        sort(data, 'updatedAt')
        buttonDecoration(sortByUpdatedAt)
    })

    function sort(data, value) {
        
        table.innerHTML = ''
        direction = !direction;
        data.sort((a, b) => {
            if (value == 'id') {
                if (direction) {
                    return a.id - b.id;
                } else if (!direction) {
                    return b.id - a.id;
                }
            } else if (value == 'createdAt') {
                if (direction) {
                    return (new Date(a.createdAt).getTime()) - (new Date(b.createdAt).getTime());
                } else if (!direction) {
                    return (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getTime());
                }
            } else if (value == 'updatedAt') {
                if (direction) {
                    return (new Date(a.updatedAt).getTime()) - (new Date(b.updatedAt).getTime());
                } else if (!direction) {
                    return (new Date(b.updatedAt).getTime()) - (new Date(a.updatedAt).getTime());
                }
            } else if (value == 'fullName') {
                const fullNameA = (a.surname + a.name + a.lastName).toUpperCase();
                const fullNameB = (b.surname + b.name + b.lastName).toUpperCase();
                if (direction) {
                    return fullNameA.localeCompare(fullNameB);
                } else {
                    return fullNameB.localeCompare(fullNameA);
                }
            }
        })
        createClientsRow(data)

    }

    function buttonDecoration(btn) {
        const arrowIcon = btn.querySelector('.clients__arrow-icon');
        const arrowIconArr = document.querySelectorAll('.clients__arrow-icon');
        arrowIconArr.forEach(item => {
            if (item.classList.contains('clients__arrow-icon--down')) {
                item.classList.remove('clients__arrow-icon--down')
            }
        })
        if (!direction) {
            arrowIcon.classList.add('clients__arrow-icon--down')
        } else {
            arrowIcon.classList.remove('clients__arrow-icon--down')
        }
        const btnArr = document.querySelectorAll('.clients__head-text');
        btnArr.forEach(item => {
            if (!item.classList.contains(btn)) {
                item.classList.remove('clients__head-text--active')
            }
        })
        btn.classList.add('clients__head-text--active')
    }

    function defaultSort() {
        sort(data, 'id');
        buttonDecoration(sortById)
    }
    defaultSort()

}