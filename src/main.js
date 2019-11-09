const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const hbs = require('express-handlebars');

const walletInstance = require('./klaytn/createWallet')

const mongoose = require('mongoose');
const config = require('./config.json');

require('express-async-errors');

const port = 8090;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

mongoose.Promise = global.Promise;

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

fs.readdirSync(path.join(__dirname, 'routes')).forEach((name) => {
    let m = require(path.join(__dirname, 'routes', name));
    app.use(m.path, m.router);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, (err) => {
    if (!err) {
        console.log(`Listening on port ${port}`);
    } else {
        console.error(err.message);
    }
});