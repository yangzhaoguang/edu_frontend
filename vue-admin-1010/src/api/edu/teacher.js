// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 查询讲师列表的方法【带条件分页查询】
    getTeacherList(current,limit,teacherQuery) {
        return request({
            // 拼接参数的俩种方法: 建议使用第二种
            // url: 'eduservice/teacher/pageQuery/'+ current + ' / ' + limit,
            url: `eduservice/teacher/pageQuery/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    },
    // 2. 删除讲师
    removeTeacherById(id){
        return request({
            url: `eduservice/teacher/${id}`,
            method: 'delete'
        })
    },
    // 3. 增加讲师
    addTeacher(teacher){
        return request({
            url: `eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    // 4. 根据 id 查询教师
    getTeacherByID(id){
        return request({
            url: `eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    // 5. 根据 Id 修改教师
    updateTeacher(EduTeacher){
        return request({
            url: `eduservice/teacher/updateTeacher`,
            method: 'post',
            data: EduTeacher
        })
    }
}
