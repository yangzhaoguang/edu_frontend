<template>
  <div class="app-container">

    <!--查询条件表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="orderQuery.nickname" placeholder="用户昵称" />
      </el-form-item>

      
      <el-form-item>
        <el-select
          v-model="orderQuery.status"
          clearable
          placeholder="订单支付状态"
        >
          <el-option :value="0" label="未支付" />
          <el-option :value="1" label="已支付" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="orderQuery.createTime"
          type="datetime"
          placeholder="选择订单创建时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getAllOrderList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--查询条件表单结束-->

    <!-- 订单表格 -->
    <el-table :data="orderList" border fit highlight-current-row >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 计算序号的一个公式 -->
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="orderNo" label="订单号"  align="center"/>

      <el-table-column prop="courseTitle" label="课程名称" align="center"/>

      <el-table-column prop="teacherName" label="讲师名称" align="center"/>

      <el-table-column prop="nickname" label="用户昵称" align="center"/>

      <el-table-column prop="mobile" label="用户手机号" align="center"/>

      <el-table-column prop="totalFee" label="订单金额" align="center"/>

      <el-table-column prop="gmtCreate" label="订单创建时间" align="center"/>

      <el-table-column label="支付状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已支付</el-tag>
          <el-tag type="info" v-else>未支付</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- Element-ui 会自动将这些值封装 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getAllOrderList"
    />
  </div>
</template>

<script>
import orderApi from '../../api/order/order';
export default {
    data() {
        return {
            orderList:[],
            orderQuery:{},
            current: 1, // 当前页
            limit: 10, // 每页显示条数
            total: 0, // 总记录数
        }
    },
    created() {
        this.getAllOrderList(this.current)
        
    },
    methods: {
        getAllOrderList(current=1){
            orderApi.getAllOrderList(current,this.limit,this.orderQuery).then(res =>{
                console.log(res)
                this.orderList = res.data.page.records;
                this.total =  res.data.page.total
            })
        },
        resetData(){
        this.orderQuery = {},
        this.getAllOrderList(this.current)
    }
}
}
</script>

<style></style>
