const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod/';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');


function deleteStock(element, ticker) {
    let data = JSON.stringify({
        "ticker": ticker
    });

    return fetch(url, {
        method: 'delete',
        body: data
    })

        .then(response => {
            if (response.status == 200) {
                element.parentElement.removeChild(element);
            }
        })
}

function addStock(ticker, price) {


    let data = JSON.stringify({
        "ticker": ticker,
        "price": `${price}`
    });

    fetch(url, {
        method: 'post',
        body: data
    })
        .then(response => response.json())
        .then(data => {
            data = JSON.parse(data);
            if (data["statusCode"] == 200) {
                addStockToDom(ticker, price);
            }
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
            for (let i = 0; i < stocks.length; i++) {
                let ticker = stocks[i].ticker;
                let price = stocks[i].price;
                addStockToDom(ticker, price);
            }
        })
}

function addStockToDom(ticker, price) {
    let template = `
    <div class="card">
       <p class="ticker">${ticker}</p>
       <p class="target">${price}</p>
       <p class="current">Get from API</p>
       <a class="remove fas fa-minus-circle"></a>
   </div>`;
    let element = htmlToElement(template);
    cards.append(element);
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
        let ticker = e.target.parentElement.children[0].innerText;
        deleteStock(e.target.parentElement, ticker);
    }
});

document.onload = getStocksFromDynamo();