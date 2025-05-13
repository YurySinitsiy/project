import showCountInFilter from "./CountInFilter.js";
import filter from "./Filter.js";
import slider from "./Slider.js"
import showBasket from "./showBasket.js";
export default async function getData() {
    const cardsResponse = await fetch('./data/data.json', {
        headers: {
            email: "unstable195@gmail.com",
        }
    })
    const cards = await cardsResponse.json();
    showCountInFilter(cards);
    filter(cards);
    slider(cards);
    showBasket();
}