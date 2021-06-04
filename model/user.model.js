let query = require('../db/mysql')

const User = {
  // 注册
  register(params) {
    let _sql = 'insert into user set username= ?, password= ?, nickname=?,create_time=?;'
    return query(_sql, params)
  },
  // 登录
  login(params) {
    let _sql = `select id, username, password,nickname from user where username="${params}";`
    return query(_sql, params)
  },
//   //通过nickname查找
//   findByNickname(params) {
//     let _sql = `select id, username, password, nickname, avatar,signature from user where nickname="${params}";`
//     return query(_sql, params)
//   },
  //通过username查找
  findByUsername(params) {

    // let _sql = `select id, username, password, nic_kname, avatar,signature from user where username="${params}";`
    let _sql = `select id, username, password, nickname from user where username="${params}";`
    return query(_sql, params)
  },
  // 获取用户信息
  getUserInfo(params) {
    let _sql = `select  id, username, nickname, phone,sex,born,avatar,province,city,person_describe from user where username="${params}";`
    return query(_sql, params)
  },
  // 更新用户信息
  updateUserInfo(params) {
    let _sql = `update user set nickname=?, avatar=?,sex=?,born=?,province=?,city=?,person_describe=? where id=?;`
    return query(_sql, params)
  },
  updatePwd(params){
    let _sql = `update user set  password=? where id=?;`
    return query(_sql, params)
  }
}

module.exports = User
