export default function accordion() {
    const accordionBtn = document.querySelectorAll('.accordion__btn');
    const accordionBtnArr = Array.from(accordionBtn);
    accordionBtnArr.forEach((btn) => {
        btn.addEventListener('click', function () {
            accordionBtnArr.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('accordion__btn--active');
                }
            });
            btn.classList.toggle('accordion__btn--active');
        })
    })
}