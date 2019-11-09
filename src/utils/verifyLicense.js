
const FormData = require('form-data');
const axios = require('axios');
const cheerio = require('cheerio');

const verifyLicense = async (checkPage, flag, publishDate, name, licenseNumber, ghostNo) => {
    const form = new FormData();
    console.log(checkPage, flag, publishDate, name, licenseNumber, ghostNo)

    const splittedDate = publishDate.split('-')
    const splittedLicenseNumber = licenseNumber.split('-')


    form.append('checkPage', checkPage)
    form.append('flag', flag)
    form.append('regYear', '19' + splittedDate[0][0] +splittedDate[0][1])
    form.append('regMonth', splittedDate[0][2] +splittedDate[0][3])
    form.append('regDate', splittedDate[0][4] +splittedDate[0][5])
    form.append('name', name)
    form.append('licenNo0', '서울')
    form.append('licenNo1', splittedLicenseNumber[1])
    form.append('licenNo2', splittedLicenseNumber[2])
    form.append('licenNo3', splittedLicenseNumber[3])
    form.append('ghostNo', ghostNo)

    const checkByGovernment = await axios.post('https://www.efine.go.kr/licen/truth/licenTruth.do?subMenuLv=010100', form, {
        headers: form.getHeaders()
    })
    const $ = cheerio.load(checkByGovernment.data)

    let checkResult = $('table#licen-truth').children().first().children().first().children().first().next().text()
    checkResult = checkResult.replace(/(\s*)/gi, "")

    const isCheckedLicense = checkResult === '전산자료와일치합니다.식별번호가일치합니다.' ? true : false

    return isCheckedLicense
}

module.exports = verifyLicense