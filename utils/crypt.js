const crypto = require("crypto");

padchar = "#";

const enc_substitution = [36, 57, 165, 85, 221, 37, 16, 139, 22, 153, 104, 27, 180, 197, 131, 30, 143, 125, 205, 145, 0, 239, 91, 130, 137, 11, 
2, 75, 146, 24, 117, 111, 232, 233, 62, 231, 185, 64, 112, 43, 78, 202, 80, 179, 174, 38, 196, 142, 97, 175, 195, 8, 234, 52, 126, 249, 40, 177, 
63, 148, 35, 55, 254, 189, 136, 207, 79, 90, 152, 176, 188, 82, 49, 68, 206, 209, 1, 76, 70, 135, 56, 167, 242, 248, 13, 83, 72, 61, 103, 224, 201, 
21, 39, 192, 247, 229, 119, 170, 106, 29, 157, 245, 141, 172, 237, 208, 67, 168, 116, 92, 236, 162, 107, 129, 178, 26, 20, 213, 219, 88, 151, 210, 
235, 150, 132, 86, 158, 133, 160, 203, 74, 163, 10, 48, 138, 155, 127, 187, 6, 7, 228, 147, 241, 222, 58, 41, 100, 99, 113, 252, 108, 253, 230, 54, 
200, 53, 134, 156, 105, 124, 28, 110, 84, 191, 204, 183, 182, 161, 159, 3, 65, 66, 244, 4, 198, 194, 199, 164, 31, 246, 166, 120, 98, 123, 223, 101, 
154, 140, 77, 45, 87, 34, 59, 12, 149, 18, 211, 44, 186, 47, 93, 51, 81, 226, 173, 169, 144, 89, 217, 69, 71, 251, 184, 240, 193, 121, 115, 94, 46, 
212, 225, 128, 171, 214, 5, 42, 218, 255, 17, 238, 60, 73, 114, 118, 96, 227, 33, 32, 243, 109, 220, 14, 102, 19, 25, 23, 181, 122, 250, 9, 216, 50, 
215, 95, 190, 15];

const dec_substitution = [20, 76, 26, 169, 173, 224, 138, 139, 51, 249, 132, 25, 193, 84, 241, 255, 6, 228, 195, 243, 116, 91, 8, 245, 29, 244, 
115, 11, 160, 99, 15, 178, 237, 236, 191, 60, 0, 5, 45, 92, 56, 145, 225, 39, 197, 189, 218, 199, 133, 72, 251, 201, 53, 155, 153, 61, 80, 1, 144, 
192, 230, 87, 34, 58, 37, 170, 171, 106, 73, 209, 78, 210, 86, 231, 130, 27, 77, 188, 40, 66, 42, 202, 71, 85, 162, 3, 125, 190, 119, 207, 67, 22, 
109, 200, 217, 253, 234, 48, 182, 147, 146, 185, 242, 88, 10, 158, 98, 112, 150, 239, 161, 31, 38, 148, 232, 216, 108, 30, 233, 96, 181, 215, 247, 
183, 159, 17, 54, 136, 221, 113, 23, 14, 124, 127, 156, 79, 64, 24, 134, 7, 187, 102, 47, 16, 206, 19, 28, 141, 59, 194, 123, 120, 68, 9, 186, 135, 
157, 100, 126, 168, 128, 167, 111, 131, 177, 2, 180, 81, 107, 205, 97, 222, 103, 204, 44, 49, 69, 57, 114, 43, 12, 246, 166, 165, 212, 36, 198, 137,
70, 63, 254, 163, 93, 214, 175, 50, 46, 13, 174, 176, 154, 90, 41, 129, 164, 18, 74, 65, 105, 75, 121, 196, 219, 117, 223, 252, 250, 208, 226, 118, 
240, 4, 143, 184, 89, 220, 203, 235, 140, 95, 152, 35, 32, 33, 52, 122, 110, 104, 229, 21, 213, 142, 82, 238, 172, 101, 179, 94, 83, 55, 248, 211, 
149, 151, 62, 227];

const enc_derangement = [1, 12, 3, 2, 0, 15, 7, 5, 6, 4, 8, 14, 13, 9, 10, 11];

const dec_derangement = [4, 0, 3, 2, 9, 7, 8, 6, 10, 13, 14, 15, 1, 12, 11, 5];


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
    let text_len = plainText.length, key_len = key.length, i = 0, j = 0, index, x, temp;
    const enc_dec_rounds = key.length % 4 + 2;
    let ciphered = plainText.split("");
    
    for(let r = 0; r < enc_dec_rounds; ++r)
    {
        // Byte Substitution
        for(i = 0; i < text_len; i++)
            ciphered[i] = String.fromCharCode(enc_substitution[ciphered[i].charCodeAt(0)]);
        
        // Derangement
        for(i = 0; i < text_len; i+=key_len)
        {
            index = enc_derangement[0];
            x = ciphered[i];
            while(true)
            {
                temp = ciphered[index + i];
                ciphered[index + i] = x;
                x = temp;
                if(index == 0)
                    break;
                index = enc_derangement[index];
            }
        }
        
        // XOR
        i = 0;
        j = 0;
        while(i < text_len)
        {
            ciphered[i] = String.fromCharCode(ciphered[i].charCodeAt(0) ^ key.charCodeAt(j));
            i++;
            j = (j + 1) % key_len;
        }
    }
    let res = "";
    for(i = 0; i < text_len; i++)
            res += ciphered[i]
    return Buffer.from(res, 'binary').toString('base64')
}

function decrypt(cipherText, key, outputEncoding = "utf8") {
    cipherText = Buffer.from(cipherText, 'base64').toString('binary')
    let padkey = key

    let text_len = cipherText.length, key_len = key.length, i = 0, j = 0, index, x, temp;
    const enc_dec_rounds = key.length % 4 + 2;
    let deciphered = cipherText.split("");

    for(let r = 0; r < enc_dec_rounds; ++r)
    {
        // UnXOR
        i = 0;
        j = 0;
        while(i < text_len)
        {
            deciphered[i] = String.fromCharCode(deciphered[i].charCodeAt(0) ^ key.charCodeAt(j));;
            i++;
            j = (j + 1) % key_len;
        }

        // Reverse Derangement
        for(i = 0; i < text_len; i+=key_len)
        {
            index = dec_derangement[0];
            x = deciphered[i];
            while(true)
            {
                temp = deciphered[index + i];
                deciphered[index + i] = x;
                x = temp;
                if(index == 0)
                break;
                index = dec_derangement[index];
            }
        }
    
        // Backsubstitute bytes
        for(i = 0; i < text_len; i++)
            deciphered[i] = String.fromCharCode(dec_substitution[deciphered[i].charCodeAt(0)]);;
        
    }

    let res = "";
    for(i = 0; i < text_len; i++)
        if (deciphered[i] == padchar)
            break;
        else
            res += deciphered[i];

    return res
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
