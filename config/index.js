const path = require('path')

module.exports = {
  rootPath: '/api',
  port: '3000',
  pwdSalt: 'pwd_salt',
  jwtTokenSecret:'auth_key',
  publicDir: path.resolve(__dirname, '../public'),
  logPath: path.resolve(__dirname, '../logs/koa-template.log'),
  mysql: {
    database: 'toutiao',
    username: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
  },
  info: {
    name: 'koa-template',
  },
}
