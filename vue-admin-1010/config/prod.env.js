// 'use strict'
// module.exports = {
//   NODE_ENV: '"production"',
//   BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
// }
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // 访问 Linux 中  Nginx 的地址
  BASE_API: '"http://192.168.200.132:8222"',

})
