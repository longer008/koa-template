const Router = require('koa-router')
// const swaggerJSDoc = require('swagger-jsdoc')
const config = require('../config')
const controller = require('../controller')
let router = new Router({
  prefix: config.rootPath,
})
let prefix=""
// swagger的时候每个接口前需要加上前缀
if (config.swagger) {
  router = new Router({
  })
  prefix=config.rootPath
}

//#region
/**
 * @swagger
 * /:
 *   get:
 *     description: 首页
 *     tags: [测试]
 *     produces:
 *       - application/json
 *       - html
 *     parameters:
 *     responses:
 */
//#endregion
router.get(prefix+'/', (ctx, next) => {
  console.log(config)
  ctx.response.body = config.info
})

// #region
/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登入
 *     description: 用户登入
 *     tags: [用户模块]
 *     consumes: [application/json]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: 用户名
 *         required: true
 *         in: path
 *         type: string
 *       - name: password
 *         description: 用户密码
 *         required: true
 *         in: path
 *         type: string
 *     responses:
 *       1:
 *         description: 成功
 *       0:
 *         description: 失败
 *
 */
router.post(prefix+'/login', controller.user.login) // 登录
// #endregion
/**
 * @swagger
 * '/register':
 *   get:
 *     tags: [用户模块]
 *     summary: '用户模块'
 *     consumes: [application/json]
 *     produces: [application/json]
 *     parameters:
 *       - name: 'username'
 *         description: '用户名'
 *         in: body
 *         required: true
 *         type: string
 *         example: 'foo'
 *     responses:
 *       200:
 *         description: '请求成功'
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: '处理成功'
 *               type: boolean
 *               example: true
 */
router.post(prefix+'/register', controller.user.register) // 注册

/**
 * @swagger
 * '/getUserInfo':
 *   get:
 *     tags: [用户模块]
 *     summary: '获取用户信息'
 *     produces: [application/json]
 *     parameters:
 *       - name: 'username'
 *         description: '用户名'
 *         in: query
 *         required: true
 *         type: string
 *         example: 'admin'
 *     responses:
 *       200:
 *         description: '请求成功'
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: '处理成功'
 *               type: boolean
 *               example: true
 */
router.get(prefix+'/getUserInfo', controller.user.getUserInfo) // 获取用户信息

/**
 * @swagger
 * '/updateUserInfo':
 *   put:
 *     tags: [用户模块]
 *     summary: '修改用户信息'
 *     produces: [application/json]
 *     parameters:
 *       - name: 'id'
 *         description: 'id'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '1'
 *       - name: 'nickname'
 *         description: '昵称'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '吕布'
 *       - name: 'avatar'
 *         description: '头像'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '/images/avatar/qq.png'
 *       - name: 'sex'
 *         description: '性别'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '男'
 *       - name: 'born'
 *         description: '生日'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '2020-10-10'
 *       - name: 'province'
 *         description: '省'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '甘肃省'
 *       - name: 'city'
 *         description: '市'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '兰州市'
 *       - name: 'person_describe'
 *         description: '个人描述'
 *         in: formData
 *         required: true
 *         type: string
 *         example: '从此刻开始，战场由我一人主宰!可有人敢与我一战!'
 *     responses:
 *       200:
 *         description: '请求成功'
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               description: '处理成功'
 *               type: boolean
 *               example: true
 */
router.put(prefix+'/updateUserInfo', controller.user.updateUserInfo) // 修改用户信息

module.exports = router
