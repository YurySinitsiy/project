const tabGroup = document.querySelector('.connect__tabs-controls');
const firstTab = tabGroup.firstElementChild;
const secondTab = tabGroup.lastElementChild;

const contentGroup = document.querySelector('.connect__tabs-content');
const firstList = contentGroup.firstElementChild;
const secondList = contentGroup.lastElementChild;

firstTab.addEventListener('click', function () {
    showList()
})
secondTab.addEventListener('click', function () {
    showList()
})

function showList() {
    firstTab.classList.toggle('is-active');
    secondTab.classList.toggle('is-active');
    firstList.classList.toggle('is-active');
    secondList.classList.toggle('is-active');
}