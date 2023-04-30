// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    selectComment(courseid){
        return request({
            url: `eduservice/comment/selectComment/` + courseid,
            method: 'get',
        })
    },
    removeComment(commentid){
        return request({
            url: `eduservice/comment/removeComment/` + commentid,
            method: 'delete',
        })
    }
}