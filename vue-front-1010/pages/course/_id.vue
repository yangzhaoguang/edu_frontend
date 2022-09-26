<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <!-- 课程分类 -->
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">
          {{ courseInfo.subjectLevelOne }}</a
        >
        \
        <span class="c-333 fsize14">{{ courseInfo.subjectLevelTwo }}</span>
      </section>
      <!-- 课程基本信息 -->
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              height="357px"
              :src="courseInfo.cover"
              :alt="courseInfo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseInfo.title }}</span>
            </h2>
            <section class="c-attr-jg" v-if="Number(courseInfo.price) == 0">
              <b class="c-yellow" style="font-size: 24px">免费</b>
            </section>
            <section class="c-attr-jg" v-else>
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px"
                >￥{{ courseInfo.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ courseInfo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <!-- '立即购买按钮 和 立即观看按钮' -->
            <section class="c-attr-mt"  v-if="isBuy || Number(courseInfo.price) === 0">
              <a
                href="#"
                title="立即观看"
                class="comm-btn c-btn-3"
                >立即观看</a
              >
            </section>

            <section class="c-attr-mt"  v-else>
              <a
                href="#"
                title="立即观看"
                class="comm-btn c-btn-3"
                @click="addOrder"
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ courseInfo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- 课程介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <!-- v-html 将课程简介中的html标签解析 -->
                      <p v-html="courseInfo.description">
                        {{ courseInfo.description }}
                      </p>
                    </section>
                  </div>
                </div>
                <!-- 章节大纲 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterVideoList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              title="第一章"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <a
                                  :href="'/player/' + video.videoSourceId"
                                  :title="video.title"
                                  target="_blank"
                                >
                                  <span
                                    v-if="Number(courseInfo.price) === 0"
                                    class="fr"
                                  >
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <span v-else class="fr">
                                    <i class="free-icon vam mr10">购买</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- 主讲讲师 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="courseInfo.avatar"
                          width="50"
                          height="50"
                          alt
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{
                        courseInfo.teacherName
                      }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ courseInfo.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->

    <!-- 课程评论 -->
    <div class="mt50 commentHtml">
      <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">课程评论</span>
        </h6>
        <section class="lh-bj-list pr mt20 replyhtml">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <!-- 用户头像，登录显示用户头像，未登录显示默认 -->
                <span v-if="loginInfo == null">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    src="~/assets/img/avatar-boy.gif"
                  />
                </span>
                <span v-else>
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="loginInfo.avatar"
                  />
                </span>
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <!-- v-if 判断是否登录 发布评论框 -->
                  <fieldset>
                    <span v-if="loginInfo == null">
                      <textarea
                        name=""
                        v-model="comment.content"
                        placeholder="登录之后才能进行评论哦~"
                        id="commentContent"
                      ></textarea>
                    </span>
                    <span v-else>
                      <textarea
                        name=""
                        v-model="comment.content"
                        placeholder="您现在可以评论此课程了哦~"
                        id="commentContent"
                      ></textarea>
                    </span>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl"
                      ><tt
                        class="c-red commentContentmeg"
                        style="display: none"
                      ></tt
                    ></span>
                    <input
                      type="button"
                      @click="addComment()"
                      value="回复"
                      class="lh-reply-btn"
                    />
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <!-- 评论列表 -->
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment, index) in data.items" v-bind:key="index">
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="comment.avatar"
                  />
                </aside>
                <div class="of">
                  <span class="fl">
                    <font class="fsize12 c-blue"> {{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span
                  >
                </div>
                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      comment.gmtCreate
                    }}</font></span
                  >
                </div>
              </li>
            </ul>
          </section>
        </section>

        <!-- 公共分页 开始 -->
        <div class="paging">
          <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
          <a
            :class="{ undisable: !data.hasPrevious }"
            href="#"
            title="首页"
            @click.prevent="gotoPage(1)"
            >首</a
          >
          <a
            :class="{ undisable: !data.hasPrevious }"
            href="#"
            title="前一页"
            @click.prevent="gotoPage(data.current - 1)"
            >&lt;</a
          >
          <a
            v-for="page in data.pages"
            :key="page"
            :class="{
              current: data.current == page,
              undisable: data.current == page,
            }"
            :title="'第' + page + '页'"
            href="#"
            @click.prevent="gotoPage(page)"
            >{{ page }}</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="后一页"
            @click.prevent="gotoPage(data.current + 1)"
            >&gt;</a
          >
          <a
            :class="{ undisable: !data.hasNext }"
            href="#"
            title="末页"
            @click.prevent="gotoPage(data.pages)"
            >末</a
          >
          <div class="clear" />
        </div>
        <!-- 公共分页 结束 -->
      </div>
    </div>
    <!-- 课程评论结束 -->
  </div>
</template>

<script>
import courseApi from "~/api/course";
import commentApi from "~/api/comment";
import loginApi from "~/api/login";
import orderApi from "~/api/order";
export default {
  layout: "default",
  data() {
    return {
      courseInfo: {},
      chapterVideoList: {},
      courseId: "",
      // ===============================  评论相关数据
      page: 1, //当前页
      limit: 5, // 每页显示数量
      comment: {}, // 保存发布评论的信息
      data: {}, // 保存分页数据
      loginInfo: {
        // 保存用户信息
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
      isBuy: false, // 课程是否购买
    };
  },
  created() {
    if (this.$route.params.id) {
      this.courseId = this.$route.params.id;
    }
    // 获取课程信息
    this.getCourseInfo();
    // 获取所有的评论
    this.getAllComment();
    // 获取用户信息
    this.getUserInfo();
  },
  methods: {
    // ==========================================================================c
    // 1. 查询课程详情
    getCourseInfo() {
      courseApi.getCourseDetailInfo(this.courseId).then((response) => {
        this.courseInfo = response.data.data.courseInfo;
        this.chapterVideoList = response.data.data.chapterVideoList;
        // 判断课程是否已经购买
        this.isBuy = response.data.data.isBuy
        
      });
    },
    // ========================================================================== 评论功能
    // 3. 获取所有的评论
    getAllComment() {
      commentApi
        .getCommentList(this.courseId, this.page, this.limit)
        .then((response) => {
          this.data = response.data.data;
        });
    },
    // 4. 页码跳转
    gotoPage(page) {
      this.page = page;
      commentApi.getCommentList(page, this.limit).then((response) => {
        this.data = response.data.data;
      });
    },
    // 5. 从 cookie 中获取用户信息
    getUserInfo() {
      loginApi.getUser().then((response) => {
        this.loginInfo = response.data.data.userInfo;
      });
    },
    // 6.发表评论
    addComment() {
      // 先判断用户是否登录
      if (!this.loginInfo) {
        // 没有登录,跳转到登录页面
        this.$router.push({ path: "/login" });
        this.$message({
          type: "error",
          message: "请先登录",
        });
      } else {
        // 赋值
        this.comment.courseId = this.courseId;
        this.comment.teacherId = this.courseInfo.teacherId;
        this.comment.memberId = this.loginInfo.id;
        this.comment.nickname = this.loginInfo.nickname;
        this.comment.avatar = this.loginInfo.avatar;
        commentApi.publishComment(this.comment).then((response) => {
          // 发表成功
          // 刷新评论列表
          this.getAllComment();
          //  清空输入框
          this.comment.content = "";
        });
      }
    },
    // ========================================================================== 生成订单
    addOrder() {
      //  登录之后，允许生成订单
      if (this.loginInfo) {
        orderApi.saveOrder(this.courseId).then((response) => {
          //  跳转到订单页面，使用动态路由的方式。
          this.$router.push({ path: "/orders/" + response.data.data.orderNo });
        });
      } else {
        // 没有登录,跳转到登录页面
        this.$router.push({ path: "/login" });
        this.$message({
          type: "error",
          message: "请先登录",
        });
      }
    },
  },
};
</script>
