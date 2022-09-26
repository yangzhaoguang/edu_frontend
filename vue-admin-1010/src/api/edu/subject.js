// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 课程分类列表
    getAllSubject() {
        return request({
            url: `eduservice/subject/getAllSubject`,
            method: 'get',
        })
    },
}
