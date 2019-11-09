const express = require('express');
const router = express.Router();

function setLayout(req, name = 'plain') {
    return {layout: (!req.get('X-PJAX') ? name : false)};
}

router.get('/', (req, res) => {
    // 로그인 되어있는지? 체크
    res.render('login', setLayout(req)); // 임시
});
router.get('/signup', (req, res) => {
    res.render('signup', setLayout(req));
});

router.get('/home', (req, res) => {
    res.render('home', setLayout(req));
});

module.exports = {
    router, path: '/'
};
