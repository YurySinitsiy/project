import createClientsRow from "./CreateClientsRow.js"
import sortClients from "./SortClients.js"
import search from "./Search.js"
export default async function getData() {
    try {
        const response = await fetch('http://localhost:3000/api/clients', {
            method: 'GET',
        })
        const data = await response.json()
        createClientsRow(data)
        if (document.querySelector('.loader__wrapper')) {
            document.querySelector('.loader__wrapper').remove()
        }
    
        sortClients(data)
        search(data)
    }catch (error) {
        console.error(error)
    }

    
}