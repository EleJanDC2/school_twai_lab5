const express = require('express');
const config = require('./config'); // dodając tę linię, trzeba pamiętać o stworzeniu pliku config.js

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

const path = require('path');
const {response} = require("express");

app.use(express.static(path.join(__dirname, 'public')));


const napis1 = "MÓJ NAPIS"

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html', {subject: napis1})
})

app.get("/template/:variant/:a/:b", (request, response) => {
    const variant = request.params.variant;
    const a = parseInt(request.params.a);
    const b = parseInt(request.params.b);

    switch (variant) {
        case "sum":
            result = a + b;
            break;
        case "sub":
            result = a - b;
            break;
        case "multiply":
            result = a * b;
            break;
        case "divide":
            result = a / b;
            break;
        default:
            result = undefined;
    }

    response.render(__dirname + '/result.html',{result : result})
});

app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
});
