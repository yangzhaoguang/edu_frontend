<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
<el-form-item label="讲师头像">

    <!-- 头衔缩略图 -->
    <pan-thumb :image="teacher.avatar"/>
    <!-- 文件上传按钮 -->
    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
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
                   :url="BASE_API+'/oss/file/upload'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>

</el-form-item>


      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveTeacher()"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入上传头像的组件
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import teacherApi from "@/api/edu/teacher"

export default {
  // 注册组件
    components: { ImageCropper, PanThumb },
  data() {
    return {
      // teacher 里不写属性也可以，会自动创建
      teacher: {
        avatar: 'http://inews.gtimg.com/newsapp_bt/0/9680744084/641'
      },
       BASE_API: process.env.BASE_API, // 接口API地址
      //  上传头像的 key
      imagecropperKey: 0,
      // 是否显示上传头像的弹框
      imagecropperShow: false,
      // 设置按钮是否为禁用状态，防止重复提交
      saveBtnDisabled: false,
    };
  },
  created() {
    
  },
  methods: {
    // 关闭弹窗执行的回调
    close() {
      // 关闭弹窗
      this.imagecropperShow = false;
    },
      // 上传成功执行的回调
    cropSuccess(data) {
       this.imagecropperShow = false;
       // data 是上传成功后端返回来的数据
      this.teacher.avatar = data.url
      // 解决头像上传的bug
      this.imagecropperKey += 1
    },
  
    //  增加讲师
    saveTeacher() {
      teacherApi.addTeacher(this.teacher).then((response) => {
        // 增加成功提示信息
        this.$message({
          type: "success",
          message: "增加成功!",
        });
        //  增加完后回到讲师列表，路由重定向
        this.$router.push({path: '/edu/teacher/list'})
      });
    },
  },
};
</script>


