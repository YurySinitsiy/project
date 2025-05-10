import getData from "./GetData.js"

export default async function deleteClientById(clientId) {
    try {
        await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(error);
    }

    getData()
}