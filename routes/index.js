
const Router = require('koa-router')
const config = require('../config')
const controller = require('../controller')
const router = new Router({
    // prefix: config.rootPath,
})


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
 *       200:
 *         description: 登入成功
 */
router.get('/api/', (ctx, next) => {
  console.log(config)
  ctx.response.body = config.info
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登入
 *     description: 用户登入
 *     tags: [用户模块]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: 用户密码.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: username
 *         description: 用户名.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       1:
 *         description: 成功
 *       0:
 *         description: 失败
 *
 */
router.post('/api/login', controller.user.login) // 登录

router.post('/register', controller.user.register) // 注册
router.post('/getUserInfo', controller.user.getUserInfo) // 获取用户信息
// .put('/updateUserInfo', controller.user.updateUserInfo)  // 修改用户信息

module.exports = router
