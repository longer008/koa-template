let query = require('../db/mysql')
const Post = {
  // 添加文章
  addPost(params) {
    let _sql =
      'insert into post set artTitle= ?, abstract= ?, category=?, tag=?, thumbnail=?, content=?,cdate=?,id =?,pv=0,discuss=0;'
    return query(_sql, params)
  },
  // 编辑文章
  editPost(params) {
    let _sql =
      'update post set artTitle= ?, abstract= ?, category=?, tag=?, thumbnail=?, content=? where id=?;'
    return query(_sql, params)
  },
  // 文章列表
  postList(params) {
    let _sql =
      "select id, artTitle, abstract, category, tag,(select COUNT(*) from post as total) as total, thumbnail, content, FROM_UNIXTIME(cdate/1000,'%Y-%m-%d  %H:%i:%s') as cdate ,status from post ORDER BY cdate desc limit ?,?;"
    return query(_sql, params)
  },
  // 文章详情
  postDetail(params) {
    let _sql =
      'select artTitle, abstract, category, tag, thumbnail, content from post where id =?;'
    return query(_sql, params)
  },
}
module.exports = Post


