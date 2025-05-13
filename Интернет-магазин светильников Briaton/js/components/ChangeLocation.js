    export default function changeLocation() {
        const changeLocationBtn = document.querySelector('.location__city');
        const currentCity = document.querySelector('.location__city-name');
        changeLocationBtn.addEventListener('click', () => {
            changeLocationBtn.classList.toggle('location__city--active');
        })
        const selectedCity = document.querySelectorAll('.location__sublink');
        selectedCity.forEach(city => {
            city.addEventListener('click', () => {
                currentCity.textContent = city.textContent;
                changeLocationBtn.classList.remove('location__city--active');
            })
        })
    }