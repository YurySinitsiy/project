import getData from "./GetData.js"
export default async function editClientById(clientId, client) {

    try {
       await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client)

        })
    } catch (error) {
        console.error(error)
    }

    getData()

}