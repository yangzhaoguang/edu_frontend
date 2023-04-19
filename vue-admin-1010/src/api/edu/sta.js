// request 封装了axios
import request from "@/utils/request";

// ES6 模块化
export default {
  // 2. 获取统计数据
  getData(searchObj) {
    return request({
      url: `staService/statistics/showData/`,
      method: "post",
      data: searchObj
    });
  }
};
