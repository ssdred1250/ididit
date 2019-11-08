const express = require('express');
const router = express.Router();
const { Keccak } = require('sha3');

router.get('/:id', async(req, res) => {
    const phoneNumber = req.params.id;

    const str = 'abc';
    const phoneNumber_str = phoneNumber.concat(str);

    const hash = new Keccak(256);
    const phoneNumber_hash = hash.update(phoneNumber_str).digest('hex'); //전화번호 해싱

    
});

module.exports = {path: '/verification', router};
