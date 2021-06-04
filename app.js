const Koa = require('koa')
const path = require('path')
const { koaSwagger } = require('koa2-swagger-ui')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')
// 引入 koa-static
const staticFiles = require('koa-static')
const config = require('./config')
let router=require('./routes')

const whitelist = require('./routes/whitelist')
const { errorHandler, responseHandler } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const {logger,loggerMiddleware}=require('./middlewares/logger')

const app = new Koa()
// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, './public')))

// Error Handler
// app.use(errorHandler)
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
      const error={
        status:401,
        message:'token已过期!,请重新登录'
      }
      ctx.body=error
      ctx.status=401
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
// Cors
app.use(cors(corsHandler))

app.use(bodyParser())

// logger
app.use(async (ctx, next) => {
  await loggerMiddleware(ctx,next)
  // console.log(`${ctx.request.method} ${ctx.request.url}`)
  // await next()
})


// swagger
if (config.swagger) {
  router = require('./util/swagger')
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/swagger.json',
      },
    }),
  )
}

// Router
app.use(router.routes(), router.allowedMethods())

// Response
// app.use(responseHandler)

const server = app.listen(config.port, config.host, () => {
  const host = server.address().address
  const port = server.address().port
  logger.warn('应用已启动，访问地址为 http://%s:%s', host, port)
})
