const http = new XMLHttpRequest();
const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');

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

addStock = (ticker, price) => {
    let template = `
        <div class="card">
            <p class="ticker">${ticker}</p>
            <p class="target">${price}</p>
            <p class="current">Get from API</p>
        </div>`;
    let element = htmlToElement(template);
    cards.append(element);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addStock(form.ticker.value.toUpperCase(), form.price.value);
});