
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


be careful:
路由的方法一定要和jsdoc的一致


使用get请求时:注意获取参数的时候在jsdoc ->parameters 设置 `in：query`



头像静态文件  koa-static

注意post/put 填写表单有多个参数时 consumes ，一般别加吧
就算设置为 ` consumes:[application/json,application x-www-form-urlencoded]`,好像也只有`application/json`生效，会导致
`invalid JSON, only supports object and array`这个错误，
如果不设置这个参数一切正常

Content-Type---consumes 代表发送端（客户端|服务器）发送的实体数据的数据类型。 
Accept----produces 希望服务器响应发送回来的的数据类型


暂时移出swagger，直接修改 `app.js`
```js
+ const router = require('./routes');
- const swagger = require('./util/swagger')
```

移除
```js
const { koaSwagger } = require('koa2-swagger-ui')
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
)

```

在routes中添加api前缀
```js
const router = new Router({
+    prefix: config.rootPath,
})

```


添加 yargs 命令行输入隐私信息
internal/crypto/hash.js:82
    throw new ERR_INVALID_ARG_TYPE('data',

TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received type number

解决办法：
```js
var pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.username,
+    password: config.mysql.password+"",
    database: config.mysql.database,
    port: config.mysql.port,
    charset : 'utf8mb4'
});
```

### 权限控制
1. ~~~当前登录的用户只能查看他自己的用户信息，也只有他和管理员能修改他的信息~~~
可能不需要，因为用户登陆后才能获取token 

2. 修改密码等登录信息后需要前端清除本地token让用户重新登陆

3. 现在先只做APP端，不做管理端

4. 统一错误处理

### 疑问
如果每一个需要token 验证的接口都加上token验证，还需要下面的代码吗
```js
const jwt = require('koa-jwt')
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      const error={
        status:401,
        message:'token已过期!,请重新登录'
      }
      ctx.body=error
    } else {
      throw err
    }
  })
})

app.use(
  jwt({
    secret: config.jwtTokenSecret,
  }).unless({
    path: whitelist,
  }),
)
```


