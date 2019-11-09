
const {
    Keccak
} = require('sha3');

const hashing = (srcString) => {

    const str = 'abc';
    const soltedString = srcString.concat(str);

    const hash = new Keccak(256);
    const hashedString = hash.update(soltedString).digest('hex');

    return hashedString
}

module.exports = hashing