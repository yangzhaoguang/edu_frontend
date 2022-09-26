import request from '@/utils/request'

export default {
    // 1.分页查询讲师列表
  getTeacherList(page,limit) {
    return request({
      url: `/eduservice/teacherFront/pageTeacher/${page}/${limit}`,
      method: 'post'
    })
  },

      // 2.查询讲师详情
      getTeacherInfo(teacherid) {
        return request({
          url: `/eduservice/teacherFront/teacherInfoFront/${teacherid}`,
          method: 'get'
        })
      },

}