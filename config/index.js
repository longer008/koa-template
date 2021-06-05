const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

module.exports = {
  rootPath: '/api',
  host:'127.0.0.1',
  port: '3000',
  pwdSalt: 'pwd_salt',
  // token
  jwtTokenSecret:'auth_key',
  tokenExp:Math.floor(Date.now() / 1000) + 60 * 60 * 1, //1小时
  // algorithm:'RS256',

  swagger:false,

  publicDir: path.resolve(__dirname, '../public'),
  logPath: path.resolve(__dirname, '../logs/koa-template.log'),
  mysql: {
    database: argv.database,
    username: argv.username,
    password: argv.password,
    host: '127.0.0.1',
    port: 3306,
  },
  info: {
    name: 'koa-template',
    desc:'koa后端模板代码',
    version:'1.0.0'
  },
  
}
