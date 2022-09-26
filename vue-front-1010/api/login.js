import request from '@/utils/request'

export default {
    // 1.登录
  login(user) {
    return request({
      url: `ucenterService/ucenter/frontLogin/` ,
      method: 'post',
      data: user
    })
  },
    // 2.根据token获取用户信息
    getUser() {
        return request({
          url: `ucenterService/ucenter/getUserInfo/`,
          method: 'get',
        })
      },

}