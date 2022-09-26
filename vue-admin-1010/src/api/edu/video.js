// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {

    // 2.增加小节
    addVideo(video) {
        return request({
            url: `/eduservice/video/addVideo/`,
            method: 'post',
            data: video
        })
    },

    // 3.根据 id 查询小节
    getVideoById(videoId) {
        return request({
            url: `/eduservice/video/getVideoById/` + videoId,
            method: 'get',
        })
    },

    // 4.修改小节
    updateVideo(video) {
        return request({
            url: `/eduservice/video/updateVideo/`,
            method: 'post',
            data: video
        })
    },

    // 5.删除小节
    deleteVideo(videoId) {
        return request({
            url: `/eduservice/video/deleteVideo/` + videoId,
            method: 'delete',
        })
    },

    // 6.删除视频
    deleteALiYunVideo(id) {
        return request({
            url: `/vodservice/vod/deleteALiYunVideo/` + id,
            method: 'delete',
        })
    },



}