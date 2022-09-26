<template>
  <div class="app-container">
    <!--查询条件表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="courseQuery.status"
          clearable
          placeholder="发布状态"
        >
          <el-option :value="'Normal'" label="已发布" />
          <el-option :value="'Draft'" label="未发布" />
        </el-select>
      </el-form-item>

      <el-form-item label="选择时间">
        <el-date-picker
          v-model="courseQuery.gmtCreate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--查询条件表单结束-->

    <!-- 讲师列表表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 计算序号的一个公式 -->
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称" width="300" />

      <el-table-column label="发布状态" width="80">
        <!-- 用于判断的一种方法，== 判断值，=== 判断值和类型 -->
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="50" />

      <el-table-column prop="gmtCreate" label="发布时间" width="160" />

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editCourseInfo(scope.row.id)"
            >编辑课程信息</el-button
          >

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editCourseChapter(scope.row.id)"
            >编辑课程大纲</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除课程信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 讲师列表表格结束 -->

    <!-- 分页 -->
    <!-- Element-ui 会自动将这些值封装 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import course from "@/api/edu/course";
export default {
  data() {
    return {
      total: 0,
      current: 1,
      limit: 10,
      courseQuery: {},
      list: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 编辑课程信息
    editCourseInfo(id) {
      this.$router.push({ path: "/edu/course/info/" + id });
    },
    //  编辑课程大纲
    editCourseChapter(id) {
      this.$router.push({ path: "/edu/course/chapter/" + id });
    },
    // ========================================================================= 删除课程
    removeDataById(id) {
      this.$confirm("此操作将永久删除课程信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击 确定 执行的方法
          course.deleteCourse(id).then((response) => {
            // 删除成功的方法
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 刷新
            this.getList();
          });
        })
        .catch(() => {
          // 点击 取消 执行方法
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // ========================================================================= 查询课程信息【条件 + 分页】
    getList(current = 1) {
      course
        .pageQuery(current, this.limit, this.courseQuery)
        .then((response) => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    //  清空查询条件
    resetData() {
      this.courseQuery = {};
      this.getList();
    },
  },
};
</script>

<style>
</style>