const crypto = require("crypto");

padchar = "#"

function XOR_hex(a, b) {
    var res = "",
        i = a.length,
        j = b.length;
    while (i-- > 0 && j-- > 0)
        res = String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(j)) + res;
    return res;
}

function encrypt(plainText, key) {
    while (plainText.length % key.length != 0) {
        plainText += padchar
    }
    let padkey = key
    while (padkey.length != plainText.length) {
        padkey += key
    }
    let ciphered = XOR_hex(plainText, padkey)
    return Buffer.from(ciphered).toString('base64')
}

function decrypt(cipherText, key, outputEncoding = "utf8") {
    cipherText = Buffer.from(cipherText, 'base64').toString('ascii')
    let padkey = key
    while (padkey.length != cipherText.length) {
        padkey += key
    }
    let deciphered = XOR_hex(cipherText, padkey)
    while (deciphered[deciphered.length - 1] == padchar)
        deciphered = deciphered.slice(0, -1)

    return deciphered
}

module.exports = { encrypt, decrypt }
