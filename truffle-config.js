const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const NETWORK_ID = '1001';
const GASLIMIT = '2500000';
const URL = 'https://api.baobab.klaytn.net:8651';
const PRIVATE_KEY = '0xbd533ca11d82353654075f69be6bdca6ff11ca2dbd26c27215d2983d33152025';

module.exports = {
  networks: {
    klaytn: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    }
  }
};