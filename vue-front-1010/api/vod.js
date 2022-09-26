import request from '@/utils/request'

export default {

    // 1. 获取视频播放凭证
  getPlayAuth(vid) {
    return request({
      url: `/vodservice/vod/getPlayAuth/${vid}`,
      method: 'get'
    })
  }

}