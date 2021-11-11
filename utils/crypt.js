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

function gen_sha256(msg) {
    hash = crypto.createHash('sha256');
    data = hash.update(msg, 'utf8')
    gen_hash = data.digest('hex');
    return gen_hash
}

function check_and_decrypt(msg, key) {
    const tmp = msg.split('|')
    sha = tmp[0]
    msg = tmp[1]
    if (sha != gen_sha256(msg))
        return null

    return decrypt(msg, key)
}

function hash_and_encrypt(msg, key) {
    const cipher = encrypt(msg, key)
    const sha = gen_sha256(cipher)
    return sha + '|' + cipher
}

module.exports = { encrypt, decrypt, hash_and_encrypt, check_and_decrypt }
