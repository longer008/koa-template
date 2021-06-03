const Koa = require('koa')
const { koaSwagger } = require('koa2-swagger-ui')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')
const config = require('./config')
// const router = require('./routes');
const swagger = require('./util/swagger')
const whitelist = require('./routes/whitelist')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const app = new Koa()

// Error Handler
app.use(errorHandler)
app.use(async (ctx, next) => {
  // 拦截器
  const allowedOrigins = []
  const origin = ctx.request.headers.origin || ''
  if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
    ctx.set('Access-Control-Allow-Origin', origin)
  }
  ctx.set({
    'Access-Control-Allow-Headers':
      'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/json;charset=utf-8',
  })

  // OPTIONS
  if (ctx.request.method == 'OPTIONS') {
    ctx.status = 200
    return false
  }
  await next()
})

// token错误处理
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = 'token已过期！，请重新登录'
    } else {
      throw err
    }
  })
})
app.use(
  jwt({
    secret: config.secret,
  }).unless({
    path: whitelist,
  }),
)
// Cors
app.use(cors(corsHandler))
// Helmet
app.use(bodyParser())
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`)
  await next()
})

app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
)

swagger.get('/',(ctx)=>{
    ctx.body="hello"
})
// Router
app.use(swagger.routes(), swagger.allowedMethods())

// Response
app.use(responseHandler)
app.listen(3000, () => {
  console.log('打开浏览器查看：http://localhost:3000')
})
