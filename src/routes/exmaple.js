const express = require('express');
const router = express.Router();

router.get('/hello', async(req, res) => { // GET /basepath/hello
    res.end('Hello world');
});

module.exports = {path: '/basepath', router};
