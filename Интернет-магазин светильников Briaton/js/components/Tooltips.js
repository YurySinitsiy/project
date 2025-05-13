export default function showTooltips(list) {
    const tooltips = list.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        const tooltipBtn = tooltip.querySelector('.tooltip__btn');
        const tooltipContent = tooltip.querySelector('.tooltip__content');
        tippy(tooltipBtn, {
            content: tooltipContent,
            allowHTML: true,
            trigger: 'mouseenter',
            theme: 'light',
            arrow: false,
            onShow() {
                tooltipContent.style.display = 'block';
            }
        })
    });
}