<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="编辑课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <!-- 编辑课程基本信息 -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 一级分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <!-- 总课时 -->
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/oss/file/upload'"
          class="avatar-uploader"
        >
          <!-- 默认图片 -->
          <img :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";

import subject from "@/api/edu/subject";

import Tinymce from "@/components/Tinymce";

export default {
  components: { Tinymce },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {
        subjectParentId: "",
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "http://m.atguigu.com/images/index/kb20220608.png",
        price: 0,
      },
      courseId: "", // 课程 Id
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [], // 保存讲师列表
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类
    };
  },

  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    },
  },
  created() {
    this.init();
  },

  methods: {
    // 初始化界面
    init() {
      //判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        this.getCourseInfoId();
        //  查询讲师列表
        this.findTeacherList();
      } else {
        //路径没有id值，做添加
        //清空表单
        this.courseInfo = {
          cover: "http://m.atguigu.com/images/index/kb20220608.png",
          subjectId: "",
        };
        //  查询讲师列表
        this.findTeacherList();
        // 查询所有一级分类
        this.getSubjectOneList();
      }
    },

    // 判断是修改还是增加
    saveOrUpdate() {
      if (this.$route.params.id) {
        this.updateCourseInfo();
      } else {
        this.addCourse();
      }
    },

    // ========================================================================= 增加课程
    // 动态显示二级分类
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectOneList.length; i++) {
        if (value == this.subjectOneList[i].id) {
          this.subjectTwoList = this.subjectOneList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    // 动态获取一级分类
    getSubjectOneList() {
      subject.getAllSubject().then((response) => {
        this.subjectOneList = response.data.list;
      });
    },
    // 动态获取讲师列表
    findTeacherList() {
      course.getTeacherList().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    // 上传头像成功执行
    handleAvatarSuccess(res) {
      this.courseInfo.cover = res.data.url;
    },
    // 上传头像之前执行
    beforeAvatarUpload(file) {
      // 对图片进行校验
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 增加课程信息
    addCourse() {
      if (this.courseInfo.title == null) {
        this.$message({
          type: "error",
          message: "课程标题不能为空",
        });
      } else {
        course.addCourseInfo(this.courseInfo).then((response) => {
          this.$message({
            type: "success",
            message: "课程基本信息增加成功",
          });
          //   跳转到课程大纲页面
          this.$router.push({
            path: "/edu/course/chapter/" + response.data.courseId,
          });
        });
      }
    },

    // ========================================================================= 修改课程信息
    // 修改课程信息
    updateCourseInfo() {
      course.updateCourse(this.courseInfo).then((response) => {
        this.$message({
          type: "success",
          message: "课程基本信息修改成功",
        });
        //   跳转到课程大纲页面
        this.$router.push({
          path: "/edu/course/chapter/" + this.courseId,
        });
      });
    },

    // 回显课程信息
    getCourseInfoId() {
      course.getCourseInfoById(this.courseId).then((response) => {
        this.courseInfo = response.data.courseInfoVo;
        subject.getAllSubject().then((response) => {
          // 获取所有一级分类
          this.subjectOneList = response.data.list;
          this.subjectOneList.forEach((element) => {
            if (this.courseInfo.subjectParentId == element.id) {
              this.subjectTwoList = element.children;
            }
          });
        });
      });
    },
  },
};
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>