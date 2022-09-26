// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 分页获取 banner 数据
    getAllBanner(current, limit) {
        return request({
            url: `cmsService/cmsAdmin/pageQuery/${current}/${limit}`,
            method: 'get',
        })
    },

    // 2.根据 id 获取banner
    getBannerById(bannerId) {
        return request({
            url: `cmsService/cmsAdmin/getByID/` + bannerId,
            method: 'get',
        })
    },

    // 3.增加 banner
    addBanner(banner) {
        return request({
            url: `cmsService/cmsAdmin/saveBanner/`,
            method: 'post',
            data: banner
        })
    },

    // 4.删除 banner
    deleteBanner(bannerId) {
        return request({
            url: `cmsService/cmsAdmin/removeBanner/` + bannerId,
            method: 'delete',
        })
    },

    // 5.修改 banner
    updateBanner(crmBanner) {
        return request({
            url: `cmsService/cmsAdmin/updateBanner/`,
            method: 'post',
            data: crmBanner
        })
    },
      // 6.设置前台的 banner图
      editBannerCount(bannerIds) {
        return request({
          url: `cmsService/cmsAdmin/editFrontBannerCount/`,
          method: 'post',
          data: bannerIds
        })
      }
    

}
