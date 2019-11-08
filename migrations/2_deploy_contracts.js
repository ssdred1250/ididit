const fs = require('fs')
const Verification = artifacts.require('./Verification.sol')

module.exports = function (deployer) {
  deployer.deploy(Verification)
    .then(() => {
      if (Verification._json) {
        fs.writeFile('deployedABI', JSON.stringify(Verification._json.abi),
          (err) => {
            if (err) throw err;
            console.log("파일에 ABI 입력 성공");
          }
        )
        fs.writeFile("deployedAddress", Verification.address,
          (err) => {
            if (err) throw err;
            console.log("파일에 주소 입력 성공");
          }
        )
      }
    })
}
