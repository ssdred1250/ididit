const express = require('express');
const multer = require('multer');
const request = require('request-promise');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

const verifyLicense = require('../utils/verifyLicense')

router.post('/', upload.fields([
    {name: 'license', maxCount: 1},
    {name: 'face', maxCount: 1}
    ]), async(req, res) => {
    // 전화번호 인증을 받았다 가정
    let result = await request('https://visionai.skcc.com/ocr/irs/recognize-id', {
        method: 'POST',
        headers: {
            'api-key': '7c721b57-a711-4fc1-bbb9-72bc71499004',
            'Content-Type': 'multipart/form-data; charset=UTF-8'
        },
        formData: {
            sourceFile: {
                value: req.files.license[0].buffer,
                options: {filename: 'license', contentType: 'image/jpg'}
            },
            targetFile: {
                value: req.files.face[0].buffer,
                options: {filename: 'face', contentType: 'image/jpg'}
            }
        }
    });
    // res.json(Object.keys(result));
    let ocr = JSON.parse(result);
    console.log(ocr.score)
    console.log(ocr.ocrResult)

    const verifiedLicense = await verifyLicense(2, 'searchPage', ocr.ocrResult.regisNumber, ocr.ocrResult.name, ocr.ocrResult.licenseNumber, req.body.ghostNo)

    const answer = ocr.score > 60 && verifiedLicense

    res.json(answer);
});

module.exports = {router, path: '/register'};