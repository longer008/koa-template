const User = require('../model/user.model')
const config = require('../config')
const md5 = require('md5')
const {generateToken,verifyToken} = require('../middlewares/jwt')
const { handleSuccess, handleError } = require('../middlewares/handle')

const UserController = {
  // 注册
  register: async ctx => {
    let { username, password } = ctx.request.body
    // 先查看用户名是否已经存在
    await User.findByUsername(username)
      .then(async res => {
        if (res.length > 0) {
          handleError({ ctx, error: '用户已存在,注册失败' })
        } else {
          await User.register([
            username,
            md5(config.pwdSalt + password),
            '新用户' + new Date().getTime(),
            new Date(),
          ])
            .then(res => {
              if (res.affectedRows > 0) {
                handleSuccess({ ctx, result: '注册成功' })
              } else {
                handleError({ ctx, error: '注册失败' })
              }
            })
            .catch(error => {
              handleError({ ctx, error })
            })
        }
      })
      .catch(err => {
        handleError({ ctx,error:err })
      })
  },

  // 登录
  login: async ctx => {
    let { username, password } = ctx.request.body
    await User.login([username])
      .then(res => {
        if (res[0].password === md5(config.pwdSalt + password)) {
          let tokenData = {
            id: res[0].id,
            username: res[0].username,
            password: res[0].password,
          }
          let token = generateToken(tokenData)
          let data = {
            id: res[0].id,
            username: res[0].username,
            nickname: res[0].nickname,
            token: token,
          }
          handleSuccess({ ctx, result: data })
        } else {
          handleError({ ctx, error: '密码错误' })
        }
      })
      .catch(err => {
        handleError({ ctx, error:err })
      })
  },

  // 获取用户信息
  getUserInfo: async ctx => {
    let { username } = ctx.query

    let tokenValid = await verifyToken(ctx)
    if (!tokenValid) {
      return false
    }

    await User.getUserInfo(username)
      .then(async res => {
        if (res[0]) {
          if (res[0]['avatar']) {
            res[0]['avatar'] =
              'http://' +
              config.host +
              ':' +
              config.port +
              res[0]['avatar'] +
              ''
          }
          handleSuccess({ ctx, result: res[0] })
        } else {
          handleError({ ctx, error: res[0] })
        }
      })
      .catch(err => {
        handleError({ ctx, error: err })
      })
  },

  // 更新用户信息
  updateUserInfo: async ctx => {
    let tokenValid = await verifyToken(ctx)
    if (!tokenValid) {
      return false
    }
    let { nickname, avatar, sex, born, province, city, person_describe, id } =
      ctx.request.body
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
          handleSuccess({ ctx, result: '用户信息更新成功' })
        } else {
          handleError({ ctx, error: '用户信息更新失败' })
        }
      })
      .catch(err => {
        handleError({ ctx, error: err })
      })
  },

  //   修改密码
  updatePwd: async ctx => {
    let tokenValid = await verifyToken(ctx)
    if (!tokenValid) {
      return false
    }
    let { id, newPwd, oldPwd } = ctx.request.body
    await User.findById([id])
      .then(async verifyPwd => {
        if (verifyPwd[0].password == md5(config.pwdSalt + oldPwd)) {
          await User.updatePwd([md5(config.pwdSalt + newPwd),id]).then(async res=>{
            if (res.affectedRows > 0) {
              handleSuccess({ ctx, result: '密码修改成功' })
            } else {
              handleError({ ctx, error: '密码修改失败' })
            }
          }).catch(err=>{
            handleError({ ctx, error:err })
          })
        } else {
          handleError({ ctx, error: '原密码错误！' })
        }
      })
      .catch(verifyPwdErr => {
        handleError({ ctx, error: verifyPwdErr })
      })
  },
}

module.exports = UserController
