import request from '@/utils/request'
export default {
  // 1.获取 课程 和 教师 列表
  getCourseTeacherList() {
    return request({
      url: `/eduservice/front/index`,
      method: 'get'
    })
  },

  // 2.条件分页查询课程信息
  getCourseFrontList(page, limit, searchObj) {
    return request({
      url: `/eduservice/courseFront/getCourseFrontList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },

    // 3.查询所有分类
    getAllSubject() {
      return request({
        url: `/eduservice/subject/getAllSubject/`,
        method: 'get',
      })
    },
        // 4.查询课程详情
        getCourseDetailInfo(courseId) {
          return request({
            url: `/eduservice/courseFront/getCourseFrontInfo/` + courseId,
            method: 'get',
          })
        }
}