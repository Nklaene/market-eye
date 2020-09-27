const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod/';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');

// need to implement some type of object to keep track of which stocks the user has so no duplicates can be added to the dom

// also need to implement update functionality

// need to create sns topic & lambda function

function getStock(ticker) {

    get_url = `${url}info?ticker=${ticker}`;
    return fetch(get_url, {
        method: 'get',
    })
    .then(response => {
        if (response.status == 200) {
            return response.json();
        }
    })

} 

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
            console.log('data recieved')
            if (data["statusCode"] == 200) {
                addStockToDom(ticker, price);
            } else {
                document.querySelector('#ticker').classList.add('error');
                document.querySelector('#price').classList.add('error');
                document.getElementById('errorMsg').style.display = 'block';
            }

        })
        .catch(err => {
            console.log('API throttling')
            
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
                let target = stocks[i].price;
                addStockToDom(ticker, target);
            }
        });
}

function addStockToDom(ticker, price) {
    let template = `
    <div class="card">
       <p class="ticker">${ticker}</p>
       <p class="target">${price}</p>
       <a class="more">More info</a>
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
    } else if (e.target && e.target.classList.contains('more')) {
        
        let ticker = e.target.parentElement.children[0].innerText;
        console.log(getStock(ticker));
    }

});

document.onload = getStocksFromDynamo();