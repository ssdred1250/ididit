const cav = require('../klaytn/caver');
const contractData = require('../constants/contract');

const IDIDIT_CONTRACT = new cav.klay.Contract(contractData.abi, contractData.address);

module.exports = IDIDIT_CONTRACT;