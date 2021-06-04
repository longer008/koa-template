// 引入模块依赖
const config = require('../config')
const jwt = require('jsonwebtoken')
const { logger } = require('./logger')

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
        res = result.data || 'token有效'
      }
    } catch (e) {
      res = 'err'
    }
    return res
  }
}

const generateToken = token => {
  return new Jwt(token).generateToken()
}

const verifyToken = ctx => {
  const error = {
    status: 401,
    message: 'token已过期!,请重新登录',
  }
  let flag = true
  try {
    let token = ctx.request.headers['authorization'].split(' ')[1]
    if (!token) {
      ctx.body = error
      ctx.status = 401
      flag = false
    }
    let result = new Jwt(token).verifyToken()
    if (result == 'err') {
      ctx.body = error
      ctx.status = 401
      flag = false
    }
  } catch (err) {
    ctx.body = error
    ctx.status = 401
    flag = false
  }

  flag ? logger.fatal('token验证通过！') : logger.error('token验证失败！')
  return flag
}

module.exports = {
  generateToken,
  verifyToken,
}
