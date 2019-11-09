const IDIDIT_CONTRACT_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"constant":false,"inputs":[{"name":"_phoneNumberHash","type":"string"},{"name":"_licenseNumber","type":"string"},{"name":"_licenseType","type":"string"},{"name":"_isAdult","type":"bool"}],"name":"registerLicense","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf9708814"},{"constant":true,"inputs":[{"name":"_phoneNumberHash","type":"string"}],"name":"getLicense","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd6a7b976"}]

module.exports = IDIDIT_CONTRACT_ABI