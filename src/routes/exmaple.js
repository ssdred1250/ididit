const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const verifyLicense = require('../utils/verifyLicense')

router.get('/', async (req, res) => {
    res.end('Hello world');
});

router.post('/license/verify', upload.array(), async (req, res) => {
    const licenseData = req.body

    const isCheckedLicense = await verifyLicense(licenseData.checkPage, licenseData.flag, licenseData.regYear, licenseData.regMonth, licenseData.regDate, licenseData.name, licenseData.licenNo0, licenseData.licenNo1, licenseData.licenNo2, licenseData.licenNo3, licenseData.ghostNo)
    
    res.end('' + isCheckedLicense);
});

module.exports = { path: '/base', router };
