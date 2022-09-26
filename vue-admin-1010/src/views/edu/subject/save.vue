<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <!-- 为用户提供的Excel 模板，放在了 static 文件夹下 -->
          <a :href="'/static/test.xls'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/eduservice/subject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API, // 接口API地址
            importBtnDisabled: false, // 按钮是否禁用,
            loading: false  // 上传文件时不可点击 上传按钮
        }
    },
    created() {
        
    },
    methods: {
        //  上传成功执行的回调
        fileUploadSuccess(){
            this.loading = false
            this.$message({
                type: 'success',
                message: '课程分类增加成功'
            })
            // 路由跳转到 课程分类列表
            this.$router.push({path:'/edu/subject/list'})
        },
        // 上传失败执行的回调
        fileUploadError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: '课程分类增加失败'
            })
        },
        // 上传文件
        submitUpload() {
            this.importBtnDisabled = true
            this.loading = true
            // 提交表单，JS写法：document.getByElementById().submit()
            this.$refs.upload.submit()
        }

    },
}
</script>