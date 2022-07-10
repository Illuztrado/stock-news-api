//The user will search for a stock symbol. Get a news about stock and place them in the DOM

document.querySelector('button').addEventListener('click', getNews);

function getNews() {
    const stockSymbol = document.querySelector('#stock').value.toUpperCase();
    const date = document.querySelector('#date').value;
    fetch(`https://api.stockdata.org/v1/news/all?symbols=${stockSymbol}&published_on=${date}&filter_entities=true&limit=3&language=en&api_token=WsGCugGcxAxLBUWjVfG6b0aqPIRwKFa15LDSOcOP`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data);
          let arr = data.data;
          let meta = data.meta;

          // display results in the DOM
          document.querySelector('h4').innerText = `Displaying the top ${arr.length <= meta.found ? arr.length : meta.found} out of ${meta.found} results`;

          let results = document.querySelector('#results');

          arr.forEach(element => {
            let img = document.createElement('img');
            img.src = element.image_url;
            results.appendChild(img);

            let h2 = document.createElement('h2');
            h2.textContent = element.title;
            results.appendChild(h2);

            let spanDate = document.createElement('span');
            spanDate.setAttribute("id", "datePublished");
            spanDate.textContent = "Published on " + element.published_at;
            results.appendChild(spanDate);

            let h3 = document.createElement('h3');
            results.appendChild(h3);

            let spanSource = document.createElement('span');
            spanSource.setAttribute("id", "source");
            spanSource.textContent = "Source: " + element.source;
            results.appendChild(spanSource);

            let anchor = document.createElement('a');
            anchor.href = element.url;
            anchor.textContent = element.description;
            h3.appendChild(anchor);

          });
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}
