const stocksList = ['TACO', 'TSLA', 'RGR', 'LOGI'];
const displayStockInfo = function () {
    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news&range=1m&last=1`;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        const stockDiv = $('<div>').addClass('stock');
        const companyName = response.quote.companyName;
        const nameHolder = $('<p>').text(`Company Name: ${companyName}`);
        stockDiv.append(nameHolder);

        const stockSymbol = response.quote.symbol;
        const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);
        stockDiv.append(symbolHolder);



   //     const stockLogo = response.logo;
   //     const logoHolder = $('<p>').text(`Stock Logo: ${stockLogo}`);
   //     stockDiv.append(logoHolder);



        const stockPrice = response.quote.latestPrice;
        const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);
        stockDiv.append(priceHolder);

        const companyNews = response.news[0].summary;
        const summaryHolder = $('<p>').text(`News Headline: ${companyNews}`);
        stockDiv.append(summaryHolder);
        $('#stocks-view').prepend(stockDiv);
    });

}

const render = function () {

    $('#buttons-view').empty();

    for (let i = 0; i < stocksList.length; i++) {
        const newButton = $('<button>');
        newButton.addClass('stock-btn');
        newButton.attr('data-name', stocksList[i]);
        newButton.text(stocksList[i]);

        $('#buttons-view').append(newButton);
    }
}

const addButton = function (event) {
    event.preventDefault();
    const stock = $('#stock-input').val().trim();
    stocksList.push(stock);
    $('#stock-input').val('');
    render();
}

$('#add-stock').on('click', addButton);
$('#buttons-view').on('click', '.stock-btn', displayStockInfo);

render();