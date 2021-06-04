// 引入模块依赖
const config = require('../config')
const jwt = require('jsonwebtoken')

// 创建 jsonToken 类
class Jwt {
  constructor(data) {
    this.data = data
  }
  //生成token
  generateToken() {
    let data = this.data
    let token = jwt.sign(
      {
        data,
        exp: config.tokenExp,
      },
      config.jwtTokenSecret,
    )
    return token
  }
  // 校验token
  verifyToken() {
    let token = this.data
    let res
    try {
      let result = jwt.verify(token, config.jwtTokenSecret) || {}
      let { exp = 0 } = result,
        current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || "token有效"
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}

module.exports = Jwt

