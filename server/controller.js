const data = require('../data.json');
const list = [
    'USD',
    'EUR',
    'RUB',
    'AED',
    'AUD',
];

module.exports = (req, res) => {
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Money exchanges</title>
            <style>
                input {
                    border: 1px solid #e3e3e3;
                    padding: 2px 5px;
                    font-size: 1.2em;
                    margin: 0 .3em;
                    text-align: right;
                }
            </style>
        </head>
        <body>
            <p><b>Currencies:</b> ${list.map((item) => item).join(', ')}.</p>
            ${list.map((item) => {
                return `
                    <p>
                        <input name="${item}" type="number" value="${data.rates[item]}" /> 
                        <b>${item}</b>
                    </p>
                `;
            }).join('')}   
            <script>
                var data = ${JSON.stringify(data)};
                var list = ${JSON.stringify(list)};
                var inputs = document.getElementsByTagName('input');
                
                function change(cur, value) {
                    var baseValue = value / data.rates[cur];
                    for (var input of inputs) {
                        if (input.name !== cur) {
                            input.value = (
                                baseValue * data.rates[input.name]
                            ).toFixed(2);
                        }
                    }                    
                }
                
                for (var input of inputs) {
                    input.addEventListener('change', function(event) {
                        change(event.target.name, event.target.value);
                    });
                }
            </script>   
        </body>
        </html>
    `);
};
