<template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
      <!--查询条件表单-->
        <el-form-item>
          <el-select
            v-model="payLogQuery.payType"
            clearable
            placeholder="支付类型"
          >
            <el-option :value="1" label="微信" />
            <el-option :value="2" label="支付宝" />
          </el-select>
        </el-form-item>
  
        <el-form-item label="添加时间">
          <el-date-picker
            v-model="payLogQuery.payTime"
            type="datetime"
            placeholder="订单支付时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
        </el-form-item>
  
        <el-button type="primary" icon="el-icon-search" @click="getAllPayLogList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form>
      <!--查询条件表单结束-->
  
      <!-- 订单表格 -->
      <el-table :data="payLogList" border fit highlight-current-row >
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            <!-- 计算序号的一个公式 -->
            {{ (current - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
  
        <el-table-column prop="orderNo" label="订单号"  align="center"/>
  
        <el-table-column prop="transactionId" label="交易流水号" align="center"/>
  
        <el-table-column prop="totalFee" label="支付金额" align="center"/>
  
        <el-table-column prop="payTime" label="支付时间" align="center"/>
  
        <el-table-column label="支付类型" align="center" prop="payType">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.payType == 1">微信</el-tag>
            <el-tag type="info" v-else>支付宝</el-tag>
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
        @current-change="getAllPayLogList"
      />
    </div>
  </template>
  
  <script>
  import paylogApi from '../../api/order/paylog';
  export default {
      data() {
          return {
              payLogList:[],
              payLogQuery:{},
              current: 1, // 当前页
              limit: 10, // 每页显示条数
              total: 0, // 总记录数
          }
      },
      created() {
          this.getAllPayLogList(this.current)
          
      },
      methods: {
        getAllPayLogList(current=1){
            paylogApi.getAllPayLogList(current,this.limit,this.payLogQuery).then(res =>{
                  console.log(res)
                  this.payLogList = res.data.page.records;
                  this.total =  res.data.page.total
              })
          },
          resetData(){
          this.payLogQuery = {},
          this.getAllPayLogList(this.current)
      }
  }
  }
  </script>
  
  <style></style>
  