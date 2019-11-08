const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.end('Hello world');
});

module.exports = {path: '/', router};
