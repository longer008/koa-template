// const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'mysql',
//   logging: false,
//   operatorsAliases: false,
//   define: {
//     underscored: false,
//     freezeTableName: false,
//     charset: 'utf8',
//     dialectOptions: {
//       collate: 'utf8_general_ci',
//     },
//     timestamps: true,
//   },
//   sync: { force: false },
//   pool: { max: 5, min: 0, idle: 10000 },
// });
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log(`数据库连接成功 => ${process.env.DB_DATABASE}`);
//   })
//   .catch(err => {
//     console.error(`数据库连接失败`);
//   });

// export default sequelize;

var mysql = require('mysql2')
var config = require('../config')
var pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password + '',
  database: config.mysql.database,
  port: config.mysql.port,
  charset: 'utf8mb4',
})

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = query
