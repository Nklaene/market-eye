const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod/';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');
let userStocks = {}; // will populate on load

function postStock(ticker, price) {
    let data = JSON.stringify({
        "ticker": ticker,
        "price": `${price}`
    });

    return fetch(url, {
        method: 'post',
        body: data
    })
        .then(response => {
            console.log(response.status);
            if (response.status === 200) {
                return response.status;
            }
            throw new HttpError(response);
        })
}

function addStock(ticker, price) {
    return postStock(ticker, price)
        .then(data => {
            let template = `
        <div class="card">
            <p class="ticker">${ticker}</p>
            <p class="target">${price}</p>
            <p class="current">Get from API</p>
            <a class="remove fas fa-minus-circle"></a>
        </div>`;
            let element = htmlToElement(template);
            cards.append(element);
        })
        .catch(err => {
            if (err instanceof HttpError) {
                console.log("Error occurred: " + err.response.status);
            } else {
                throw err;
            }
        });
}

function getStocksFromDynamo() {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let stocks = data.body.Items;
            for(let i = 0; i < stocks.length; i++) {
                let ticker = stocks[i].ticker;
                let price = stocks[i].price;
                addStock(ticker, price);
            }
        }) 
}

function removeStock(element) {
    element.parentElement.removeChild(element);
}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    addStock(form.ticker.value.toUpperCase(), form.price.value);
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('remove')) {
        removeStock(e.target.parentElement);
    }
});

document.onload = getStocksFromDynamo();