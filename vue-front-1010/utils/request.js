import axios from 'axios'
import cookie from "js-cookie";

// 创建axios实例
const service = axios.create({
  baseURL: 'http://47.122.0.123:8222', // api的base_url
  timeout: 20000 // 请求超时时间
})

// 第三步: http request 拦截器
service.interceptors.request.use(
  config => {
  //debugger
  // 判断 cookie 中是否有 token
  if (cookie.get('guli_token')) {
    // 如果有 token 放入 header 中
    config.headers['token'] = cookie.get('guli_token');
  }
    return config
  },
  err => {
  return Promise.reject(err);
})

export default service