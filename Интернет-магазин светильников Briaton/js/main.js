import burgerMenu from "./components/BurgerMenu.js";
import changeLocation from "./components/ChangeLocation.js"
import getData from "./components/GetData.js";
import accordion from "./components/Accordion.js"
import postForm from "./components/PostForm.js";


window.addEventListener('DOMContentLoaded', () => {
    burgerMenu()
    changeLocation()
    getData()
    accordion()
    postForm()
});