const http = new XMLHttpRequest();
const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');

let userStocks = {}

http.open("GET", url);
http.send();

http.onreadystatechange = (e) => {
  let resonseObj = JSON.parse(http.responseText);
  console.log(resonseObj.body)
}

htmlToElement = html => {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};
// add a stock
addStock = (ticker, price) => {
    userStocks.ticker = true;
    let template = `
        <div class="card">
            <p class="ticker">${ticker}</p>
            <p class="target">${price}</p>
            <p class="current">Get from API</p>
            <a class="remove fas fa-minus-circle"></a>
        </div>`;
    let element = htmlToElement(template);
    cards.append(element);
    userStocks[`${ticker}`] = true;
    let removeBtns = document.querySelectorAll('.remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', e=> {
            removeStock(e.target.parentElement, ticker);
        });
    });
    console.log(userStocks);
}

// remove a stock
removeStock = (element, ticker) => {
    element.removeChild(element);
    delete userStocks[`${ticker}`];
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addStock(form.ticker.value.toUpperCase(), form.price.value);
});