<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>

    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="编辑课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <!-- 章节 -->
    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <ul class="chanpterList">
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openVideoDialog(chapter.id)"
              >添加小节</el-button
            >
            <el-button type="text" @click="openEditChapter(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="removeChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}

              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="removeVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous()">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog
      :visible.sync="dialogChapterFormVisible"
      title="章节信息"
      id="dialog"
    >
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="小节信息">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 上传视频 -->
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/vodservice/vod/uploadVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      chapterVideoList: [], // 保存章节小节
      courseId: "",

      // ========================================================================= 增加章节所需要的数据
      dialogChapterFormVisible: false, // 章节弹框
      chapter: {
        // 保存章节信息
        title: "",
        sort: 0,
      },

      // ========================================================================= 小节
      dialogVideoFormVisible: false, // 小节弹框
      saveVideoBtnDisabled: false,

      video: {
        // 保存小节信息
        title: "",
        sort: 0,
        free: 0,
        videoSourceId: "", // 上传视频 id
        videoOriginalName: "", // 上传视频名称
      },
      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
    };
  },

  created() {
    //  获取地址栏上的 Id
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getAllChapter();
    }
  },

  methods: {
    // ========================================================================= 上传视频
    // 删除视频执行的方法
    handleVodRemove() {
      video.deleteALiYunVideo(this.video.videoSourceId).then((response) => {
        this.$message({
          type: "success",
          message: "删除视频成功!",
        });
        // 清空文件列表
        this.fileList = [];
        // 清空视频 id 和 视频名称
        this.video.videoSourceId = "";
        this.video.videoOriginalName = "";
      });
    },
    // 点击 × 执行 的方法
    beforeVodRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 上传视频成功执行的方法
    handleVodUploadSuccess(response, file) {
      this.video.videoSourceId = response.data.videoId;
      // file表示当时上传的文件，file.name 获取文件名字
      this.video.videoOriginalName = file.name;
      this.getAllChapter();
    },
    // 上传视频之前执行的方法
    handleUploadExceed() {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },
    // ========================================================================= 修改小节
    // 区分增加还是修改
    saveOrUpdateVideo() {
      if (this.video.id) {
        this.EditVideo();
      } else {
        //  判断是否有videoSourceId
         if (this.video.videoSourceId) {
          this.saveVideo();
          // 刷新页面
          this.getAllChapter();
         }else{
          this.$message.warning("请等待视频上传成功");
         }

        
      }
    },
    // 修改小节
    EditVideo() {
      video.updateVideo(this.video).then((response) => {
        // 关闭对话框
        this.dialogVideoFormVisible = false;

        // 提示信息
        this.$message({
          type: "success",
          message: "修改小节成功!",
        });
        // 刷新页面
        this.getAllChapter();
      });
    },
    // 回显数据
    openEditVideo(videoId) {
      // 打开对话框
      this.dialogVideoFormVisible = true;
      //  回显数据
      video.getVideoById(videoId).then((response) => {
        this.video = response.data.video;
      });
    },
    // ========================================================================= 删除小节
    removeVideo(videoId) {
      this.$confirm("此操作将永久删除小节信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击 确定 执行的方法
          video.deleteVideo(videoId).then((response) => {
            // 删除成功的方法
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 刷新页面
            this.getAllChapter();
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
    // ========================================================================= 增加小节
    saveVideo() {
      // 设置 courseId
      this.video.courseId = this.courseId;

        video.addVideo(this.video).then((response) => {
          // 关闭对话框
          this.dialogVideoFormVisible = false;
          // 提示信息
          this.$message({
            type: "success",
            message: "增加小节成功!",
          });
        });
        // 刷新页面
        this.getAllChapter();
    },

    // 打开小节弹框
    openVideoDialog(chapterId) {
      this.dialogVideoFormVisible = true;
      // 将文件上传列表清空
      this.fileList = [];
      // 清空一下数据
      (this.video.title = ""),
        (this.video.sort = ""),
        (this.video.free = ""),
        (this.video.videoSourceId = ""),
        // 一定要清一下 id ，。不然修改后，就一直是修改
        (this.video.id = "");
      // 设置 chapterId
      this.video.chapterId = chapterId;
    },

    // ========================================================================= 删除章节
    removeChapter(chapterId) {
      this.$confirm("此操作将永久删除章节信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击 确定 执行的方法
          chapter.deleteChapter(chapterId).then((response) => {
            // 删除成功的方法
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 刷新页面
            this.getAllChapter();
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
    // ========================================================================= x修改章节
    // 回显章节信息
    openEditChapter(chapterId) {
      // 打开对话框
      this.dialogChapterFormVisible = true;
      //  回显数据
      chapter.getChapterbyId(chapterId).then((response) => {
        this.chapter = response.data.chapter;
      });
    },
    // 修改章节
    EditChapter() {
      chapter.updateChapter(this.chapter).then((response) => {
        // 关闭对话框
        this.dialogChapterFormVisible = false;

        // 提示信息
        this.$message({
          type: "success",
          message: "修改章节成功!",
        });
        // 刷新页面
        this.getAllChapter();
      });
    },
    // ========================================================================= 增加章节
    openChapterDialog() {
      //  打开对话框
      this.dialogChapterFormVisible = true;
      // 每次打开对话框都清空表单
      this.chapter.title = "";
      this.chapter.sort = 0;
      this.chapter.id = "";
    },
    saveChapter() {
      this.chapter.courseId = this.courseId;
      chapter.addChapter(this.chapter).then((response) => {
        // 关闭对话框
        this.dialogChapterFormVisible = false;

        // 提示信息
        this.$message({
          type: "success",
          message: "增加章节成功!",
        });
        // 刷新页面
        this.getAllChapter();
      });
    },

    // 判断是修改还是增加
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.saveChapter();
      } else {
        this.EditChapter();
      }
    },
    // ========================================================================= 显示章节列表
    // 获取所有章节小节
    getAllChapter() {
      chapter.getChaptersVideos(this.courseId).then((response) => {
        this.chapterVideoList = response.data.ChaptersAndVideos;
      });
    },
    // 上一步
    previous() {
      this.$router.push({ path: "/edu/course/info/" + this.courseId });
    },
    // 下一步
    next() {
      this.$router.push({ path: "/edu/course/publish/" + this.courseId });
    },
  },
};
</script>

<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>