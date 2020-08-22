const url = 'https://1ro1a5x4gf.execute-api.us-east-1.amazonaws.com/Prod';
const body = document.querySelector('body');
const cards = document.querySelector('.cards');
const form = document.querySelector('form');

// function getData() {
//     return fetch('https://api.github.com/users/github')
//       .then(response => {
//         if (response.status == 200) {
//           console.log("Got response back inside getData()....");
//           return response.json();
//         } else {
//           throw new HttpError(response);
//         }
//       })
//   }

postStock = (ticker, price) => {
    let data = JSON.stringify({
        "ticker": ticker,
        "price": price
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

addStock = (ticker, price) => {

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

            let removeBtns = document.querySelectorAll('.remove');
            removeBtns.forEach(btn => {
                btn.addEventListener('click', e => {
                    removeStock(e.target.parentElement, ticker);
                });
            });
        })
        .catch(err => {
            if (err instanceof HttpError) {
                console.log("Error occurred: " + err.response.status);
            } else {
                throw err;
            }
        });
}
/*

function myMethod() {
  return getData()
    .then(data => {
      console.log("In myMethod. getData() call has returned.");
      console.log(JSON.stringify(data));
    })
    .catch(err => {
      if (err instanceof HttpError) {
        console.log("Error occurred: " + err.response.status);
      } else {
        throw err;
      }
    });
}
myMethod();
*/

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