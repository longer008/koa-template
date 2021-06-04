const User = require('../model/user.model')
const config = require('../config')
const md5 = require('md5')
// const jsonToken = require('jsonwebtoken')
const Jwt=require('../middlewares/jwt')
const { handleSuccess, handleError } = require('../middlewares/handle')

const verifyToken=async ctx=>{
  try {
    let token = ctx.request.headers["authorization"].split(' ')[1];
    if (!token) {
      ctx.response.status=401
      ctx.response.message="token已过期！，请重新登录"
      return false
    }
    let result=new Jwt(token).verifyToken()
    console.log(result);
    if (result=='err') {
      ctx.response.status=401
      ctx.response.message="token已过期！，请重新登录"
      return false
    }
  } catch (error) {
    ctx.response.status=401
    ctx.response.message="token已过期！，请重新登录"
    return false
  }
  
}

const UserController = {
  // 注册
  register: async ctx => {
    let { username, password } = ctx.request.body
    // 先查看用户名是否已经存在
    await User.findByUsername(username)
      .then(async res => {
        if (res.length > 0) {
          handleError({ ctx, message: '用户已存在,注册失败' })
        } else {
          await User.register([
            username,
            md5(config.pwdSalt + password),
            '新用户' + new Date().getTime(),
            new Date(),
          ])
            .then(res => {
              if (res.affectedRows > 0) {
                handleSuccess({ ctx, result: '注册成功', message: '注册成功' })
              } else {
                handleError({ ctx, message: '注册失败' })
              }
            })
            .catch(err => {
              handleError({ ctx, message: '注册失败', err })
            })
        }
      })
      .catch(err => {
        handleError({ ctx, message: '注册失败', err })
      })
  },

  // 登录
  login: async ctx => {
    let { username, password } = ctx.request.body
    await User.login([username])
      .then(res => {
        if (res[0].password === md5(config.pwdSalt + password)) {
          let tokenData=
          {
            id: res[0].id,
            username: res[0].username,
            password: res[0].password,
          }
          let token=new Jwt(tokenData).generateToken()
          let data = {
            id: res[0].id,
            username: res[0].username,
            nickname: res[0].nickname,
            token: token
          }
          handleSuccess({ ctx, result: data, message: '登录成功' })
        } else {
          handleError({ ctx, message: '密码错误' })
        }
      })
      .catch(err => {
        handleError({ ctx, message: '登录失败', err })
      })
  },

  // 获取用户信息
  getUserInfo: async ctx => {
    let { username } = ctx.query
    try {
      let tokenValid=await verifyToken(ctx)
      if (!tokenValid) {
        return false
      }
    } catch (error) {
      ctx.response.status=401
      ctx.response.message="token已过期！，请重新登录"
      return false
    }
    
    await User.getUserInfo(username)
      .then(async res => {
        if (res[0]) {
          if (res[0]['avatar']) {
            res[0]['avatar']="http://"+config.host+":"+config.port+res[0]['avatar']+""
          }
          handleSuccess({ ctx, result: res[0], message: '获取用户信息成功' })
        } else {
          handleError({ ctx, result: res[0], message: '当前用户不存在' })
        }
      })
      .catch(err => {
        handleError({ ctx, result: err, message: '获取用户信息出错了' })
      })
  },

  // 更新用户信息
  updateUserInfo: async ctx => {
    let { nickname, avatar, sex, born,  province, city,person_describe, id } = ctx.request.body
    await User.updateUserInfo([
      nickname,
      avatar,
      sex,
      born,
      province,
      city,
      person_describe,
      id,
    ])
      .then(res => {
        if (res.affectedRows > 0) {
          handleSuccess({ ctx, result: [], message: '用户信息更新成功' })
        } else {
          handleError({ ctx, result: '', message: '信息更新失败' })
        }
      })
      .catch(err => {
        handleError({ ctx, result: err, message: '更新用户信息出错了' })
      })
  },

  //   修改密码
  updatePwd: async ctx => {
    let { id, newPwd, oldPwd } = ctx.request.body
    await User.findByUsername([username])
      .then(async verifyPwd => {
        // if (verifyPwd[0].password == md5(config.User.pwdSalt + oldpass)) {
        if (verifyPwd[0].password == oldpass) {
        } else {
          handleError({ ctx, result: '', message: '原密码错误！' })
        }
      })
      .catch(verifyPwdErr => {
        handleError({ ctx, result: verifyPwdErr, message: '出错了' })
      })
  },
}

module.exports = UserController
