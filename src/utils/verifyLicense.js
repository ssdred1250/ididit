
const FormData = require('form-data');
const axios = require('axios');
const cheerio = require('cheerio');

const verifyLicense = async (checkPage, flag, regYear, regMonth, regDate, name, licenNo0, licenNo1, licenNo2, licenNo3, ghostNo) => {
    const form = new FormData();

    form.append('checkPage', checkPage)
    form.append('flag', flag)
    form.append('regYear', regYear)
    form.append('regMonth', regMonth)
    form.append('regDate', regDate)
    form.append('name', name)
    form.append('licenNo0', licenNo0)
    form.append('licenNo1', licenNo1)
    form.append('licenNo2', licenNo2)
    form.append('licenNo3', licenNo3)
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