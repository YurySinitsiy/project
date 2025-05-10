import * as components from "./components.js";

export default function editClient(wrapper, clientId) {
    const clientsSection = document.querySelector('.clients');
    const editButton = wrapper.querySelector('.clients__btn--edit');
    editButton.addEventListener('click', function () {
        getClient(clientId)
    })

    async function getClient(clientId) {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'GET',
        })
        const data = await response.json()
        editClientModal(data)

    }

    function editClientModal(data) {
        clientsSection.classList.add('clients--active');
        const wrapper = components.createWrapper()
        const title = components.createTitle('Изменить данные')
        const closeButton = components.createCloseButton(wrapper, clientsSection)
        const idInfo = components.createClientIdText(clientId)
        const form = components.createFormEditClient(wrapper, clientsSection, data)
        const deleteClientButton = components.deleteClientButton(wrapper, clientsSection, clientId)

        form.append(idInfo)
        wrapper.append(title, closeButton, form, deleteClientButton)
        clientsSection.append(wrapper)
    }


}