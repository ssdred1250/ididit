const IDIDIT_CONTRACT = require('../constants/contract');

const express = require('express');
const router = express.Router();
const {
    Keccak
} = require('sha3');

router.get('/:id', async (req, res) => {
    const phoneNumber = req.params.id;

    const str = 'abc';
    const phoneNumber_str = phoneNumber.concat(str);

    const hash = new Keccak(256);
    const phoneNumber_hash = hash.update(phoneNumber_str).digest('hex');

    let licenseData;

    try {
        licenseData = await IDIDIT_CONTRACT.methods.getLicense(phoneNumber_hash).call();
    } catch (err) {
        console.error(err)
        res.send('Something Wrong!!')
    }

    res.send({message: '면허가 유효한 유저입니다.', value: true})

});

module.exports = {
    path: '/verification',
    router
};