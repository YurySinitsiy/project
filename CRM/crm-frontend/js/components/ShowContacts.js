export default function showContacts(data, wrapper) {
    const contactsWrapper = document.createElement('div');
    contactsWrapper.classList.add('clients__contacts-wrapper')
    data.contacts.forEach(contact => {
        const iconButton = document.createElement('button');
        iconButton.classList.add('clients__contacts-btn')
        iconButton.classList.add('btn')
        let image = 'user-icon'
        if (contact.type == "email") {
            image = 'mail-icon';
            iconButton.setAttribute('aria-label', `Показать почту клиента`)
        } else if (contact.type == "phone") {
            image = 'phone-icon';
            iconButton.setAttribute('aria-label', `Показать номер телефона клиента`)
        } else if (contact.type == "fb") {
            image = 'fb-icon';
            iconButton.setAttribute('aria-label', `Показать Facebook клиента`)
        } else if (contact.type == "vk") {
            image = 'vk-icon';
            iconButton.setAttribute('aria-label', `Показать VK клиента`)
        } else {
            image = 'user-icon'
            iconButton.setAttribute('aria-label', `Показать контакт клиента`)
        }

        iconButton.innerHTML = `
        <svg class="clients__contacts-icon" aria-hidden="true" width="16" height="16">
            <use xlink:href="images/sprite.svg#${image}"></use>
        </svg>    
        `
        contactsWrapper.append(iconButton)
        wrapper.querySelector('.clients__contacts').append(contactsWrapper)

        function tooltips() {
            let type;
            switch (contact.type) {
                case "mail":
                    type = 'Email';
                    break;
                case "phone":
                    type = 'Телефон';
                    break;
                case "fb":
                    type = 'Facebook';
                    break;
                case "vk":
                    type = 'VK';
                    break;
                case "twitter":
                    type = 'Twitter';
                    break;
                case "instagram":
                    type = 'Instagram';
                    break;
                case "tg":
                    type = 'Telegram';
                    break;
                default:
                    type = 'Контакт';
            }

            const info = contact.value
            tippy(iconButton, {
                content: `${type}: ${info}`,
                theme: "new-style",
                trigger: 'focusin'
            })
        }
        tooltips()
    })
}