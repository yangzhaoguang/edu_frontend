import request from '@/utils/request'

export default {
    // 1.生成订单
    saveOrder(courseId) {
        return request({
            url: `orderService/order/createOrder/` + courseId,
            method: 'post',
        })
    },
    // 2.根据订单号查询订单
    getOrderInfo(orderNo) {
        return request({
            url: `orderService/order/getOderByOrderNo/` + orderNo,
            method: 'get',
        })
    },

    // 3.生成微信支付二维码
    createNative(orderNo) {
        return request({
            url: `orderService/payLog/createNative/` + orderNo,
            method: 'get',
        })
    },

    // 4.查询支付状态
    getPayStatus(orderNo) {
        return request({
            url: `orderService/payLog/queryPayStatus/` + orderNo,
            method: 'get',
        })
    },

}