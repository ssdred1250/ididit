// const IDIDIT_CONTRACT_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"constant":false,"inputs":[{"name":"_phoneNumberHash","type":"string"},{"name":"_licenseNumber","type":"string"},{"name":"_licenseType","type":"string"},{"name":"_isAdult","type":"bool"}],"name":"registerLicense","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf9708814"},{"constant":true,"inputs":[{"name":"_phoneNumberHash","type":"string"}],"name":"getLicense","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd6a7b976"}]

const IDIDIT_CONTRACT_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "demoteAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_phoneNumberHash",
				"type": "string"
			},
			{
				"name": "_type",
				"type": "string"
			}
		],
		"name": "invalidateLicense",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user",
				"type": "address"
			}
		],
		"name": "promoteAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_phoneNumberHash",
				"type": "string"
			},
			{
				"name": "_type",
				"type": "string"
			},
			{
				"name": "_identifier",
				"type": "string"
			},
			{
				"name": "_expiry",
				"type": "uint64"
			},
			{
				"name": "_data",
				"type": "string"
			}
		],
		"name": "registerLicense",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_phoneNumberHash",
				"type": "string"
			},
			{
				"name": "_type",
				"type": "string"
			}
		],
		"name": "getLicense",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

// const IDIDIT_CONTRACT_ADDRESS = '0xDb29Ba48C391aE1084b187ADd8e41D302c2bAb1F';
const IDIDIT_CONTRACT_ADDRESS = '0x8e45b6a2fE60dBA40403202BB6Efa42aAA1d1023';

module.exports = { abi: IDIDIT_CONTRACT_ABI, address: IDIDIT_CONTRACT_ADDRESS };