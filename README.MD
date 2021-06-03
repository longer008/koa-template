
# 
npm init

安装
> yarn add koa koa-router  koa-bodyparser koa-helmet koa-jwt jsonwebtoken koa2-cors md5 nodemon mysql2 sequelize log4js request




可逆加密和不可逆加密
https://www.cnblogs.com/zhaowinter/p/10825565.html


密码在后端加密加密


文档：
> yarn add  koa2-swagger-ui swagger-jsdoc 


swagger坑太多了
目前采取的办法是 swagger.js中引入routes导出的router(之前是`const Router = require('koa-router')`)
如果想要添加api前缀：
1. 在swagger.js中配置 swaggerDefinition  `basePath: '/api' `
2. routes中的每一个前加 `api `,`new Router({
    prefix: '/api',
})`这样是不可以的

swagger.js 中options 配置 apis时，注意是 `['./routes/*.js']` 这里最容易出错
