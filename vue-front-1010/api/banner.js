import request from '@/utils/request'
export default {
    // 1.获取 banner
  getList() {
    return request({
      url: `/cmsService/cmsFront/getAllBanner`,
      method: 'post'
    })
  },


}