// // const Router = require('koa-router'); 
// const router = require('koa-router')(); 
// const config = require('../config')
const router=require('../routes')
const swaggerJSDoc = require('swagger-jsdoc')
// const router = new Router({
//     // prefix: config.rootPath,
// })

const swaggerDefinition = {
  info: {
    title: 'toutiao API',
    version: '1.0.0',
    description: 'API',
  },
  host: 'localhost:3000',
  basePath: '/api' // Base path (optional)
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // 写有注解的router的存放地址
};

const swaggerSpec = swaggerJSDoc(options)

// 通过路由获取生成的注解文件
router.get('/swagger.json', async ctx => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerSpec;
  });

module.exports = router

