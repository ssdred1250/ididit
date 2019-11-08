const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('express-async-errors');

const PORT = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

fs.readdirSync(path.join(__dirname, 'routes')).forEach((name) => {
    let m = require(path.join(__dirname, 'routes', name));
    app.use(m.path, m.router);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, (err) => {
    if(!err) {
        console.log(`Listening on port ${PORT}`);
    }
    else {
        console.error(err.message);
    }
});
