const IDIDIT_CONTRACT = require('../klaytn/contract');

const express = require('express');
const router = express.Router();

const hashing = require('../utils/hash')

router.get('/:id', async (req, res) => {
    const phoneNumber = req.params.id;

    const hashedId = hashing(phoneNumber)

    let licenseData;

    try {
        licenseData = await IDIDIT_CONTRACT.methods.getLicense(hashedId, "DriverLicense").call();
    } catch (err) {
        console.error(err)
        res.send('Something Wrong!!')
    }

    res.json({ message: '면허가 유효한 유저입니다.', value: licenseData })

});

module.exports = {
    path: '/verification',
    router
};