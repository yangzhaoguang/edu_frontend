<template>
  <client-only>
    <div>
      <!-- 幻灯片 开始 -->
      <!-- 幻灯片 开始 -->
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <!-- 遍历 bannerList -->
          <div
            v-for="banner in bannerList"
            :key="banner.id"
            class="swiper-slide"
            style="background: #040b1b"
          >
            <a  :href="banner.linkUrl">
              <img :src="banner.imageUrl" :alt="banner.title" class="img" />
            </a>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </div>
      <!-- 幻灯片 结束 -->
      <!-- 幻灯片 结束 -->

      <div id="aCoursesList">
        <!-- 网校课程 开始 -->
        <div>
          <section class="container">
            <header class="comm-title">
              <h2 class="tac">
                <span class="c-333">热门课程</span>
              </h2>
            </header>
            <div>
              <article class="comm-course-list">
                <ul class="of" id="bna">
                  <li v-for="course in courseList" :key="course.id">
                    <div class="cc-l-wrap">
                      <section class="course-img">
                        <img
                          :src="course.cover"
                          class="img-responsive"
                          :alt="course.title"
                        />
                        <div class="cc-mask">
                          <a
                            :href="'/course/' + course.id"
                            title="开始学习"
                            class="comm-btn c-btn-1"
                            >开始学习</a
                          >
                        </div>
                      </section>
                      <h3 class="hLh30 txtOf mt10">
                        <a
                          :href="'/course/' + course.id"
                          :title="course.title"
                          class="course-title fsize18 c-333"
                          >{{ course.title }}</a
                        >
                      </h3>
                      <section class="mt10 hLh20 of">
                        <span
                          class="fr jgTag bg-green"
                          v-if="Number(course.price) === 0"
                        >
                          <i class="c-fff fsize12 f-fA">免费</i>
                        </span>
                        <span class="fr jgTag bg-green" v-else>
                          <i class="c-fff fsize12 f-fA">
                            ￥{{ course.price }}</i
                          >
                        </span>
                        <span class="fl jgAttr c-ccc f-fA">
                          <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                          |
                          <i class="c-999 f-fA">{{ course.viewCount }}浏览</i>
                        </span>
                      </section>
                    </div>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
              <section class="tac pt20">
                <a href="/course" title="全部课程" class="comm-btn c-btn-2"
                  >全部课程</a
                >
              </section>
            </div>
          </section>
        </div>
        <!-- /网校课程 结束 -->
        <!-- 网校名师 开始 -->
        <div>
          <section class="container">
            <header class="comm-title">
              <h2 class="tac">
                <span class="c-333">名师大咖</span>
              </h2>
            </header>
            <div>
              <article class="i-teacher-list">
                <ul class="of">
                  <li v-for="teacher in teacherList" :key="teacher.id">
                    <section class="i-teach-wrap">
                      <div class="i-teach-pic">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                        >
                          <img :alt="teacher.name" :src="teacher.avatar" />
                        </a>
                      </div>
                      <div class="mt10 hLh30 txtOf tac">
                        <a
                          :href="'/teacher/' + teacher.id"
                          :title="teacher.name"
                          class="fsize18 c-666"
                          >{{ teacher.name }}</a
                        >
                      </div>
                      <div class="hLh30 txtOf tac">
                        <span class="fsize14 c-999">{{ teacher.career }}</span>
                      </div>
                      <div class="mt15 i-q-txt">
                        <p class="c-999 f-fA">
                          {{ teacher.intro }}
                        </p>
                      </div>
                    </section>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
              <section class="tac pt20">
                <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2"
                  >全部讲师</a
                >
              </section>
            </div>
          </section>
        </div>
        <!-- /网校名师 结束 -->
      </div>
    </div>
  </client-only>
</template>

<script>
import banner from "@/api/banner";
import course from "@/api/course";
export default {
  data() {
    return {
      courseList: [], // 课程列表
      teacherList: [], // 教师列表
      // 保存 banner 图像
      bannerList: [],
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
        //  轮播图自动播放
        autoplay: {
          delay: 2000,
        },
        speed: 800,
      },
    };
  },
  created() {
    this.getBannerList();
    this.getCourseTeacher();
  },
  methods: {
    // 获取课程 和 讲师列表
    getCourseTeacher() {
      course.getCourseTeacherList().then((response) => {
        this.courseList = response.data.data.courseList;
        this.teacherList = response.data.data.teacherList;
      });
    },
    // 获取 banner 图列表
    getBannerList() {
      banner.getList().then((response) => {
        // 这里和写后台管理不一样， 需要俩次 .data
        // 因为后台管理中，帮我们封装了一次 .data
        this.bannerList = response.data.data.bannerList;
      });
    },
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 100%;
}
</style>
