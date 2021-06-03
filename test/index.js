const crypto = require('crypto')
const password="123456"

const algorithm = 'aes-256-cbc'
const iv = Buffer.alloc(16, 0) // 初始化向量。
var key = "abcdefghijklmnopqrstuvwx"
// const secret = crypto.randomBytes(32); // 密钥
console.log(iv);
console.log(secret);

// 如果用户名不存在，再注册
const cipher = crypto.createCipheriv(algorithm, secret, iv)
const decipher = crypto.createDecipheriv(
    algorithm,
    secret,
    iv
);
// cipher.update(password, 'utf8', 'hex')
// let data3 = cipher.final('hex')
// console.log(data3)

decipher.update('f23456c221cbe35575c648d10ecaed1a', "hex",'utf8');

console.log(decipher.final().toString());
