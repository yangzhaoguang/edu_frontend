// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1.查询所有章节
    getChaptersVideos(courseId) {
        return request({
            url: `eduservice/chapter/getAllChapter/` + courseId,
            method: 'get',
        })
    },

    // 2.增加章节
    addChapter(chapter) {
        return request({
            url: `eduservice/chapter/addChapter/`,
            method: 'post',
            data: chapter
        })
    },

    // 3.根据 id 查询章节
    getChapterbyId(chapterId) {
        return request({
            url: `eduservice/chapter/getChapterById/` + chapterId,
            method: 'get',
        })
    },

    // 4.修改章节
    updateChapter(chapter) {
        return request({
            url: `eduservice/chapter/updateChapter/`,
            method: 'post',
            data: chapter
        })
    },

    // 5.删除章节
    deleteChapter(id) {
        return request({
            url: `eduservice/chapter/deleteChapter/` + id,
            method: 'delete',
        })
    },



}