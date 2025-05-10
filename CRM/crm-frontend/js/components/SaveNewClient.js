import getData from "./GetData.js"

export default function saveNewClient() {
    const surname = document.getElementById('surname').value.trim()
    const name = document.getElementById('name').value.trim()
    const lastName = document.getElementById('last-name').value.trim()
    const type = Array.from(document.querySelectorAll('.client-modal__subform-select'));
    const value = Array.from(document.querySelectorAll('.client-modal__subform-input'));
    const client = {
        surname: surname,
        name: name,
        lastName: lastName,
        contacts: type.map((element, index) => ({
            type: element.value.trim(),
            value: value[index].value.trim(),
        }))
    };
    createClient(client)

    async function createClient(client) {
        try {
            await fetch("http://localhost:3000/api/clients", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(client)


            })
            getData()
            //console.log('Client is saved');
        } catch (error) {
            console.log('Error: ', error);
        }
    }
}