<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="图片标题">
        <el-input v-model="banner.title" />
      </el-form-item>

      <el-form-item label="图片排序">
        <el-input-number
          v-model="banner.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>

      <!-- 图片跳转链接 -->
       <el-form-item label="图片跳转链接">
        <el-select v-model="banner.linkUrl" clearable placeholder="请选择">

          <el-option :value="'/course'" label="课程页面" />
          <el-option :value="'/teacher'" label="教师页面" />
        </el-select>
      </el-form-item>

      <el-form-item label="上传banner图">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API + '/oss/file/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveBanner"
          >增加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
import banner from "@/api/front/banner";
export default {
  data() {
    return {
      banner: {
        // 这里必须定义 imageURl，别的属性可以不定义
        //  如果不定义，上传完之后不会显示上传的图片
        imageUrl:''
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      saveBtnDisabled: false
    };
  },
  methods: {
    saveBanner(){
        banner.addBanner(this.banner).then(response => {
                    this.$message({
          type: "success",
          message: "增加成功!",
        });
        // 增加完跳转 banner 列表
        this.$router.push({path: '/banner/list'})
        })
    },
    // 上传成功执行的方法
    handleAvatarSuccess(response) {
        // 上传成功之后，返回图片的url
      this.banner.imageUrl = response.data.url;
      console.log(this.banner.imageUrl);
    },
    //   上传前执行的方法
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt2M;
    },
  },
};
</script>



<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 400px;
  height: 200px;
  display: block;
}
</style>