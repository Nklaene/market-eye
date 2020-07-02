const stocks = document.querySelector('.stock-container');

stocks.addEventListener('click', e => {
    if (e.target.classList.contains('remove')){
        e.target.parentElement.parentElement.remove();
    };
})
