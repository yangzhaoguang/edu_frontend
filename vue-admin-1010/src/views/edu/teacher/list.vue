<template>
  <div class="app-container">
    <!--查询条件表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
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

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <!-- 用于判断的一种方法，== 判断值，=== 判断值和类型 -->
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="open(scope.row.id)"
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

    <!-- 修改框 -->
    <el-dialog title="修改讲师" :visible.sync="dialogFormVisible" top="2vh">
      <el-form label-width="120px">
        <el-form-item label="讲师名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="讲师排序">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>

        <el-form-item label="讲师头衔">
          <el-select v-model="form.level" clearable placeholder="请选择">
            <el-option :value="1" label="高级讲师" />
            <el-option :value="2" label="首席讲师" />
          </el-select>
        </el-form-item>

        <el-form-item label="讲师资历">
          <el-input v-model="form.career" />
        </el-form-item>

        <el-form-item label="讲师简介">
          <el-input v-model="form.intro" :rows="10" type="textarea" />
        </el-form-item>

        <!-- 讲师头像：TODO -->
        <el-form-item label="讲师头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="form.avatar" />
          <!-- 文件上传按钮 -->
          <el-button
            type="primary"
            icon="el-icon-upload"
            @click="imagecropperShow = true"
            >更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件的回调
      @crop-upload-success：上传成功后的回调 
      -->
          <image-cropper
            v-show="imagecropperShow"
            :width="300"
            :height="300"
            :key="imagecropperKey"
            :url="BASE_API + '/oss/file/upload'"
            field="file"
            @close="close"
            @crop-upload-success="cropSuccess"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改框结束 -->

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
// 上传头像的组件
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
import teacher from "@/api/edu/teacher";

export default {
  // 注册组件
  components: { ImageCropper, PanThumb },
  data() {
    return {
      // ========================================================================= 用于查询讲师的数据
      list: null, // 保存返回的数据
      current: 1, // 当前页
      limit: 10, // 每页显示条数
      total: 0, // 总记录数
      teacherQuery: {}, // 封装条件查询对象

      // ========================================================================= 用于修改讲师的数据
      form: {
        avatar: "",
      }, // 回显的数据
      dialogFormVisible: false, // 是否关闭对话框，false 关闭，true 打开
      BASE_API: process.env.BASE_API, // 接口API地址
      imagecropperKey: 0, //  上传头像的 key
      imagecropperShow: false, // 是否显示上传头像的弹框
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // ========================================================================= 查询讲师
    getList(current = 1) {
      teacher
        .getTeacherList(current, this.limit, this.teacherQuery)
        .then((response) => {
          // 成功返回的方法，response 为返回的数据
          // console.log(response)
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },

    // 清空查询条件
    resetData() {
      this.teacherQuery = {};
      this.getList();
    },

    // ========================================================================= 删除讲师
    removeDataById(id) {
      this.$confirm("此操作将永久删除讲师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击 确定 执行的方法
          teacher.removeTeacherById(id).then((response) => {
            // 删除成功的方法
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 删除后重新查询讲师列表
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

    // ========================================================================= 修改讲师
    // 回显数据到修改框
    open(id) {
      // 点击修改打开对话框
      this.dialogFormVisible = true;
      teacher.getTeacherByID(id).then((response) => {
        // 返回的数据保存到 form 对象中去
        this.form = response.data.teacher;

        if (this.form.avatar == null) {
          // 如果头像是 null ，默认使用一个头像
          this.form.avatar =
            "http://m.atguigu.com/images/index/kb20220608.png";
        }
      });
    },
    // 修改讲师
    edit() {
      teacher.updateTeacher(this.form).then((response) => {
        // 提示信息
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        // 修改完关闭对话框
        this.dialogFormVisible = false;
        // 重新查询 讲师列表
        this.getList();
      });
    },

    // 关闭弹窗执行的回调
    close() {
      // 关闭弹窗
      this.imagecropperShow = false;
    },
    // 上传成功执行的回调
    cropSuccess(data) {
      this.imagecropperShow = false;
      // data 是上传成功后端返回来的数据
      this.form.avatar = data.url;
      this.imagecropperKey += 1;
    },
  },
};
</script>