<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>访问记录</span>
      </div>
      <div v-for="o in accessRecords" :key="o.id" class="text item">
        <span>
          <b style="color: #F56C6C;">{{ o.username }}</b> 在
          <b style="color: #F56C6C;">{{ o.loginDate }}</b
          >登录, IP地址为: <b style="color: #F56C6C;">{{ o.loginIp }}</b>
        </span>
      </div>
    </el-card>

    <br /><br />
      <!--表单-->
      <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="searchObj.begin"
          type="date"
          placeholder="选择开始日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="searchObj.end"
          type="date"
          placeholder="选择截止日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="setCharts()"
        >查询</el-button
      >
    </el-form>
    <div class="chart-container">
      <div
        ref="ec"
        id="charts"
        class="chart"
        style="height: 500px; width: 100%"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
import loginApi from "@/api/login.js";
import staApi from "@/api/edu/sta";

export default {
  name: "Dashboard",
  data() {
    return {
      searchObj:{},
      accessRecords: [],
      dataList:[],
      registerCount:[],
      videoCount:[],
      courseCount:[],
      loginCount:[]
    };
  },
  created() {
    this.getAccessRecords();
  },
  mounted() {
    this.setCharts();
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  methods: {
    // 获取登录访问记录
    getAccessRecords() {
      loginApi.getAccessRecords().then(result => {
        this.accessRecords = result.data.data;
      });
    },
    // 设置统计图属性
    setCharts(){
      staApi.getData(this.searchObj).then(response => {
        console.log(response)
        this.dataList = response.data.dataList
        this.registerCount = response.data.registerCount
        this.loginCount = response.data.loginCount
        this.videoCount = response.data.videoCount
        this.courseCount = response.data.courseCount

        this.showCharts()
      })
    },

    //  展示统计图
    showCharts() {
      var chartDom = document.querySelector("#charts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "在线教育系统数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["注册人数", "登录人数", "视频播放数", "课程增加数"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // 统计的日期,对应数据库中的：date_calculated
            data: this.dataList
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "注册人数",
            type: "line",
            stack: "Total",
            areaStyle: {
            },
            emphasis: {
              focus: "series"
            },
            data: this.registerCount
          },
          {
            name: "登录人数",
            type: "line",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: this.loginCount
          },
          {
            name: "视频播放数",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: this.videoCount
          },
          {
            name: "课程增加数",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            data: this.courseCount
          }
        ]
      };

      option && myChart.setOption(option);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1480px;
}
</style>
