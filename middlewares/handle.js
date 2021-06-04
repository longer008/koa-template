/**
 * Author：brand
 * Creation Time：2019-03-10 20:32
 * Email：brandhuang@qq.com
 * 请求成功和失败统一处理
 */
exports.handleError = ({ ctx, msg = 'failure', error = null }) => {
  const res= { code: 0, msg, data: error }
  ctx.body =res
}

exports.handleSuccess = ({ ctx, msg = 'success', result = null }) => {
  const res={ code: 1, msg, data:result }
  ctx.response.body = res
}
