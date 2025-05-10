import * as components from "./components.js";

export default function addClient() {
    const clientsSection = document.querySelector('.clients');
    const addClientButton = document.querySelector('.clients__add-button');
    addClientButton.addEventListener('click', createClientModal)

    function createClientModal() {
        clientsSection.classList.add('clients--active');
        const wrapper = components.createWrapper()
        const title = components.createTitle('Новый клиент')
        const closeButton = components.createCloseButton(wrapper, clientsSection)

        const form = components.createForm(wrapper, clientsSection)
        const cancelButton = components.createCancelButton(wrapper, clientsSection)

        wrapper.append(title, closeButton, form, cancelButton)
        clientsSection.append(wrapper)
        

    }

}