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
    let ocr = JSON.parse(result);

    try{
        const verifiedLicense = await verifyLicense(2, 'searchPage', ocr.ocrResult.regisNumber, ocr.ocrResult.name, ocr.ocrResult.licenseNumber, req.body.ghostNo)

    } catch(err) {
        res.json({message: '면허증인식이 잘 되지 않았습니다', value: false})
    }
    
    const similarity = ocr.score > 60 ? {message: '면허증의 사진과 본인이 매우 유샤합니다.', value: true} : {message: '면허증 사진과 본인이 매우 다릅니다. 자신의 면허증인지 확인해주세요.', value: false}

    const answer = similarity.value && verifiedLicense

    res.json({message: similarity.message, value: answer});
});

module.exports = {router, path: '/register'};