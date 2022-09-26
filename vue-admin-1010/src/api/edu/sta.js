// request 封装了axios
import request from '@/utils/request'

// ES6 模块化
export default {
    // 1. 生成统计数据
    createStaData(date) {
        return request({
            url: `staService/statistics/registerCount/` + date,
            method: 'post',
        })
    },

        // 2. 获取统计数据
        getData(searchObj) {
            return request({
                url: `staService/statistics/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
                method: 'get',
            })
        },
}