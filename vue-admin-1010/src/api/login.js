import request from '@/utils/request'

// 登录
export function login(username, password) {
 // debugger
  return request({
    url: '/admin/acl/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: '/admin/acl/index/menu',
    method: 'get'
  })
}

export default {
  // 查询访问记录
 getAccessRecords() {
    return request({
      url: '/admin/acl/index/loginRecords',
      method: 'get'
    })
  },
  // 增加访问记录
  saveAccessRecords(username){
    return request({
      url: '/admin/acl/index/saveUserLoginInfo?username='+username,
      method: 'get'
    })
  }
}
