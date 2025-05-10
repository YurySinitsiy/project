//import DeleteModalWrapper from './DeleteModalWrapper.js';
import * as components from "./components.js";
export default function deleteClient(wrapper, id) {
    const clientsSection = document.querySelector('.clients');
    const deleteBtn = wrapper.querySelector('.clients__btn--delete');
    deleteBtn.addEventListener('click', deleteClientModal)

    function deleteClientModal() {
        clientsSection.classList.add('clients--active');
        const wrapper = components.createWrapper()
        wrapper.classList.add('client-modal__wrapper--delete');
        const title = components.createTitle('Удаление клиента')
        const closeButton = components.createCloseButton(wrapper, clientsSection)
        const warning = components.deleteWarning()
        const deleteButton = components.createDeleteButton(wrapper, clientsSection, id)
        const cancelButton = components.createCancelButton(wrapper, clientsSection)

        wrapper.append(title, closeButton, warning, deleteButton, cancelButton)
        clientsSection.append(wrapper)
    }
}