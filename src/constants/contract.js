const cav = require('../klaytn/caver');
const IDIDIT_CONTRACT_ABI = require('../constants/abi');
const IDIDIT_CONTRACT_ADDRESS = require('../constants/address');

const IDIDIT_CONTRACT = new cav.klay.Contract(IDIDIT_CONTRACT_ABI, IDIDIT_CONTRACT_ADDRESS);

module.exports = IDIDIT_CONTRACT;