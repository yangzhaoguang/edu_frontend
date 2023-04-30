// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 查询所有订单
    getAllPayLogList(current,size,payLogQuery) {
        return request({
            url: `orderService/payLog/pageQuery/${current}/${size}`,
            method: 'post',
            data: payLogQuery
        })
    },

}