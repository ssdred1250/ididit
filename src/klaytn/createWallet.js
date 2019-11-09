const cav = require('../klaytn/caver');
const PRIVATE_KEY = require('../constants/privateKey');

const walletInstance = cav.klay.accounts.privateKeyToAccount(PRIVATE_KEY);
cav.klay.accounts.wallet.add(walletInstance);