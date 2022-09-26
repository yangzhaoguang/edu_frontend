import request from '@/utils/request'

export default {

    // 1. 获取评论列表
  getCommentList(courseid,current,limit) {
    return request({
      url: `/eduservice/comment/pageCommentList/${courseid}/${current}/${limit}`,
      method: 'get'
    })
  },
      // 2.发表评论
      publishComment(comment) {
        return request({
          url: `/eduservice/comment/saveComment/`,
          method: 'post',
          data: comment
        })
      }

}