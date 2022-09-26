import request from '@/utils/request'

export default {
    // 1.发送验证码
  sendCode(mobile) {
    return request({
      url: `/msmService/msm/sendCode/` + mobile,
      method: 'get'
    })
  },
    // 2.注册
    register(registerVo) {
        return request({
          url: `ucenterService/ucenter/frontRegister`,
          method: 'post',
          data: registerVo
        })
      },

}