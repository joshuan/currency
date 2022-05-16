const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

const URL = 'https://api.apilayer.com/fixer/latest?symbols=&base=USD';
const TOKEN = process.env.FIXER_TOKEN;

axios({
    url: URL,
    method: 'GET',
    headers: {
        apikey: TOKEN,
    },
}).then(({ data }) => {
    return fs.writeFile(path.join(__dirname, 'data/data.json'), JSON.stringify(data, null, 4), { encoding: 'utf-8' });
}).catch((err) => {
    console.error('Error:', err);
})
