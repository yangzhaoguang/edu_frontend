<template>
  <div class="app-container">
    <!-- 设置显示的轮播图 -->
    <el-row>
      <el-button
        type="info"
        plain
        class="el-icon-s-tools"
        @click="dialogFormVisible = true"
      >
        设置</el-button
      >
    </el-row>
    <br />
    <!-- 设置框 -->
    <el-dialog
      title="设置前台展示的轮播图"
      :visible.sync="dialogFormVisible"
      width="30%"
      top="5vh"
      @open="openDialog()"
    >
      <el-form>
        <span v-for="banner in list" :key="banner.id">
          <br />
          <input type="checkbox" :value="banner.id" name="changedBanner" />
          <br />
          <!-- 开启预览图 -->
          <span class="demo-image__preview">
            <el-image
              style="width: 320px; height: 120px"
              :src="banner.imageUrl"
              :preview-src-list="previewList"
            >
            </el-image>
          </span>
        </span>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFrontBanner()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- banner 列表表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          <!-- 计算序号的一个公式 -->
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="80" />

      <!-- 图片 -->
      <el-table-column
        prop="imageUrl"
        label="图片预览"
        width="400"
        align="center"
      >
        <!-- 图片预览 -->
        <template width="90" slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 100px"
              :src="scope.row.imageUrl"
              :preview-src-list="previewList"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="linkUrl" label="链接" width="100" align="center" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" align="center" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editBanner(scope.row.id)"
            >修改</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
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
      @current-change="getBannerList"
    />
  </div>
</template>
<script>
import banner from "@/api/front/banner";

export default {
  data() {
    return {
      list: [], // 保存banner数据
      current: 1,
      limit: 4,
      total: 0,
      previewList: [], // 保存预览图数组，预览图必须是一个数组

      // 设置轮播图
      dialogFormVisible: false,
      bannerIds: [], // 保存选中的图片的ID
    };
  },
  created() {
    this.getBannerList();
  },
  methods: {
    editBanner() {
            this.$message({
            type: "warning",
            message: "待完善:TODO",
          });
    },
    //  删除 banner 图
    removeDataById(bannerId) {
            this.$confirm("此操作将永久删除banner, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击 确定 执行的方法
            banner.deleteBanner(bannerId).then(response => {
            // 删除成功的方法
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 删除后重新查询banner列表
            this.getBannerList();
          });
        })
    },
    // ========================================================================= 设置前台 banner 图
    openDialog() {
      this.bannerIds = [] ;
      console.log(this.bannerIds)
    },
    editFrontBanner() {
      // 获取复选框DOM元素
      var obj = document.getElementsByName("changedBanner");

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
          //  将选中的图片 id 保存到数组中
          this.bannerIds.push(obj[i].value);
        }
      }
      console.log(this.bannerIds);

      this.$confirm("确定将设置前台banner图吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
              // 关闭对话框
      this.dialogFormVisible = false;
        // 点击 确定 执行的方法
        banner.editBannerCount(this.bannerIds).then((response) => {
          // 设置成功的方法
          this.$message({
            type: "success",
            message: "设置成功!",
          });

          // 刷新页面
          // this.getBannerList();
        });
      });
    },
    // ========================================================================= 查询 banner 列表
    getBannerList(current = 1) {
      banner.getAllBanner(current, this.limit).then((response) => {
        this.list = response.data.items;

        //  items是一个数组，将items数组拷贝到 perviewList
        for (var i = 0; i < response.data.items.length; i++) {
          //  push:是往数组末尾增加数据
          this.previewList.push(response.data.items[i].imageUrl);
        }
        this.total = response.data.total;
      });
    },
  },
};
</script>
    