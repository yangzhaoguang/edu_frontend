// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 增加课程基本信息
    addCourseInfo(courseInfo) {
        return request({
            url: `eduservice/course/addCourse`,
            method: 'post',
            data: courseInfo
        })
    },
    // 2.获取讲师列表
    getTeacherList() {
        return request({
            url: `eduservice/teacher/findAll`,
            method: 'get',
        })
    },
    // 2. 根据 courseid 查询课程信息
    getCourseInfoById(courseId) {
        return request({
            url: `eduservice/course/getCourseInfoById/` + courseId,
            method: 'get',
        })
    },
    // 3. 修改课程信息
    updateCourse(courseInfo) {
        return request({
            url: `eduservice/course/updateCourse/`,
            method: 'post',
            data: courseInfo,
        })
    },
    // 4. 课程消息确认
    getPublishCourseInfo(courseId) {
        return request({
            url: `eduservice/course/getPublishCourseInfo/` + courseId,
            method: 'get',
        })
    },
    // 5. 课程发布确认
    coursePublish(courseId) {
        return request({
            url: `eduservice/course/coursePublish/` + courseId,
            method: 'post',
        })
    },

    // 6. 课程信息列表【条件查询，分页】
    pageQuery(current, limit, courseQuery) {
        return request({
            url: `eduservice/course/pageQuery/${current}/${limit}`,
            method: 'post',
            data: courseQuery
        })
    },
    // 7. 删除课程信息
    deleteCourse(courseId) {
        return request({
            url: `eduservice/course/deleteCourse/` + courseId,
            method: 'delete',
        })
    },
}
