const Post = require('../model/post.model')
const {handleSuccess, handleError} = require("../middlewares/handle")


const PostController={
  // 添加文章
  addPost: async ctx => {
    let {artTitle, abstract, category, tag, thumbnail, content,cdate} = ctx.request.body
    let id = new Date().getTime()
    await Post.addArt([artTitle, abstract, category, tag, thumbnail, content,cdate,id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '发布成功', message: '发布成功'})

      }
    }).catch( err => {
      handleError({ctx, message: '添加文章出错',err})
    })
  },
  // 编辑文章
  editPost: async ctx => {
    let {artTitle, abstract, category, tag, thumbnail, content, id} = ctx.request.body
    await Post.editArt([artTitle, abstract, category, tag, thumbnail, content, id]).then( res => {
      if(res.affectedRows > 0){
        handleSuccess({ctx, result: '修改成功', message: '修改成功'})

      }
    }).catch( err => {
      handleError({ctx, message: '修改文章出错',err})
    })
  },
  // 获取文章列表
  getPostList: async ctx => {
    let {currentPage, limit} = ctx.request.body
    await Post.PostList([(currentPage - 1) * limit, limit]).then( res => {
       handleSuccess({ctx, result: res, message: '获取文章列表成功'})
    }).catch( err => {
      handleError({ctx, message: '获取文章列表出错',err})
    })
  },
  // 获取文章详情
  PostDetail: async ctx => {
    let {id} = ctx.request.body
    await Post.PostDetail([id]).then( res => {
        handleSuccess({ctx, result: res[0], message: '获取文章详情成功'})
    }).catch( err => {
      handleError({ctx, message: '获取文章详情出错',err})
    })
  },
}

module.exports = PostController
