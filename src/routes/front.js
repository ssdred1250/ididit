const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    // 로그인 되어있는지? 체크
    res.render('login', {layout: 'plain'}); // 임시
});

module.exports = {
    router, path: '/'
};
