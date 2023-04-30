// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 查询所有订单
    getAllOrderList(current,size,orderQuery) {
        return request({
            url: `orderService/order/pageQuery/${current}/${size}`,
            method: 'post',
            data: orderQuery
        })
    },

}