const express = require('express');
const multer = require('multer');
const request = require('request-promise');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const verifyLicense = require('../utils/verifyLicense')

const IDIDIT_CONTRACT = require('../klaytn/contract');

const walletInstance = require('../klaytn/createWallet')

const hashing = require('../utils/hash')

router.post('/', upload.fields([
    { name: 'license', maxCount: 1 },
    { name: 'face', maxCount: 1 }
]), async (req, res) => {
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
                options: { filename: 'license', contentType: 'image/jpg' }
            },
            targetFile: {
                value: req.files.face[0].buffer,
                options: { filename: 'face', contentType: 'image/jpg' }
            }
        }
    });
    let ocr = JSON.parse(result);

    let verifiedLicense
    try {
        verifiedLicense = await verifyLicense(2, 'searchPage', ocr.ocrResult.regisNumber, ocr.ocrResult.name, ocr.ocrResult.licenseNumber, req.body.ghostNo)

    } catch (err) {
        res.json({ message: '면허증인식이 잘 되지 않았습니다', value: false })
        return;
    }


    const similarity = ocr.score > 60 ? { message: '면허증의 사진과 본인이 매우 유샤합니다.', value: true } : { message: '면허증 사진과 본인이 매우 다릅니다. 자신의 면허증인지 확인해주세요.', value: false }

    let licenseData
    try {

        const hashedId = hashing('1') // TODO: will be change to ID
        const expiry = new Date(+ocr.ocrResult.publishDate.split('.')[0] + 10 + '.12.31').getTime()
        licenseData = await IDIDIT_CONTRACT.methods.registerLicense(hashedId, 'DriverLicense', ocr.ocrResult.licenseNumber, expiry, '{}').send({ gas: 3000000, from: walletInstance.address });
    } catch (err) {
        console.error(err)
        res.send('Something Wrong!!')
        return;
    }

    const answer = similarity.value && verifiedLicense

    res.json({ message: similarity.message, value: answer });
    return;
});

module.exports = { router, path: '/register' };