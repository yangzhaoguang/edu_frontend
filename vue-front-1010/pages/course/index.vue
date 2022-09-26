<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="selectAll()" :class="{ active: wholeIndex != 0 }">全部</a>
                </li>
                <!-- 遍历所有的一级分类 -->
                <li
                  v-for="(subject, index) in subjectNestedList"
                  :key="index"
                  :class="{ active: oneIndex == index }"
                >
                  <a
                    :title="subject.title"
                    href="#"
                    @click="searchOneSubjectList(subject.id, index)"
                    >{{ subject.title }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <!-- 遍历所有的二级分类 -->
                <li
                  v-for="(subject, index) in subSubjectList"
                  :key="index"
                  :class="{ active: twoIndex == index }"
                >
                  <a
                    :title="subject.title"
                    href="#"
                    @click="searchTwoSubjectList(subject.id, index)"
                    >{{ subject.title }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <!-- 根据不同选项排序 -->
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{ 'current bg-orange': buyCountSort != '' }">
                <a
                  title="销量"
                  href="javascript:void(0);"
                  @click="searchBuyCount()"
                  >销量
                  <span :class="{ hide: buyCountSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': gmtCreateSort != '' }">
                <a
                  title="最新"
                  href="javascript:void(0);"
                  @click="searchGmtCreate()"
                  >最新
                  <span :class="{ hide: gmtCreateSort == '' }">↓</span>
                </a>
              </li>
              <li :class="{ 'current bg-orange': priceSort != '' }">
                <a
                  title="价格"
                  href="javascript:void(0);"
                  @click="searchPrice()"
                  >价格&nbsp;
                  <span :class="{ hide: priceSort == '' }">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <!-- 遍历课程信息 -->
              <li v-for="(course, index) in data.items" :key="index">
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
                      title="听力口语"
                      class="course-title fsize18 c-333"
                      >{{ course.title }}</a
                    >
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span
                      class="fr jgTag bg-green"
                      v-if="Number(course.price) == 0"
                    >
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                    <span class="fr jgTag bg-green" v-else>
                      <i class="c-fff fsize12 f-fA">{{ course.price }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }}</i>
                      |
                      <i class="c-999 f-fA">{{ course.viewCount }}</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              v-if="data.current != 1"
              >首页</a
            >
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current - 1)"
              v-if="data.current != 1"
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
              v-if="data.current != data.pages"
              >&gt;</a
            >
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)"
              v-if="data.current != data.pages"
              >末页</a
            >
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
import courseApi from "~/api/course";
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      data: {}, // 保存课程数据
      subjectNestedList: [], // 一级分类列表
      subSubjectList: [], // 二级分类列表
      searchObj: {}, // 查询表单对象

      oneIndex: -1,
      twoIndex: -1,
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: "",
      wholeIndex: 1
    };
  },
  created() {
    //  查询课程信息
    this.selectTeacherList();
    // 获取所有分类
    this.selectAllSubject();
  },
  methods: {
    // 1.查询课程信息
    selectTeacherList() {
      courseApi
        .getCourseFrontList(this.page, this.limit, this.searchObj)
        .then((response) => {
          this.data = response.data.data;
        });
    },
    // 2.获取所有的分类
    selectAllSubject() {
      courseApi.getAllSubject().then((response) => {
        this.subjectNestedList = response.data.data.list;
      });
    },
    // 3. 点击页码进行跳转
    gotoPage(page) {
      courseApi
        .getCourseFrontList(page, this.limit, this.searchObj)
        .then((response) => {
          this.data = response.data.data;
        });
    },
    // 4. 点击 一级分类，显示对应的二级分类，并进行查询
    searchOneSubjectList(subjectParentId, index) {
      //  清空 '全部' 样式
       this.wholeIndex = 0
      //  点击一级分类，显示选中效果
      this.oneIndex = index;
      this.twoIndex = -1;
      //  清空二级分类Id，只对一级分类查询
      this.searchObj.subjectId = "";
      this.subSubjectList = [];

      // 将一级分类id赋值给条件查询对象
      this.searchObj.subjectParentId = subjectParentId;
      // 根据一级分类查询
      this.gotoPage(1, this.limit, this.searchObj);
      // 遍历所有的一级分类，根据一级分类id找出对应的二级分类
      this.subjectNestedList.forEach((element) => {
        // 如果点击的一级分类id与遍历的一级分类id相等，就将一级分类里的二级分类赋值给 subSubjectList
        if (subjectParentId == element.id) {
          this.subSubjectList = element.children;
        }
      });
    },
    // 5.点击二级分类，进行查询
    searchTwoSubjectList(subjectId, index) {
            //  清空 '全部' 样式
       this.wholeIndex = 0
      //  点击二级分类，显示选中效果
      this.twoIndex = index;
      // 将二级分类id赋值给条件查询对象
      this.searchObj.subjectId = subjectId;
      // 根据二级分类查询
      this.gotoPage(1, this.limit, this.searchObj);
    },
    // 6.根据销量进行排序
    searchBuyCount() {
            //  清空 '全部' 样式
       this.wholeIndex = 0
      // 只要有值就可以，是什么无所谓
      this.buyCountSort = "1";
      this.priceSort = "";
      this.gmtCreateSort = "";

      // 将条件赋值给 条件对象
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      // 查询
      this.gotoPage(this.page, this.limit, this.searchObj);
    },
    // 7.更新时间查询
    searchGmtCreate() {
            //  清空 '全部' 样式
       this.wholeIndex = 0
      this.buyCountSort = "";
      this.gmtCreateSort = "1";
      this.priceSort = "";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page, this.limit, this.searchObj);
    },
    // 8.价格查询
    searchPrice() {
            //  清空 '全部' 样式
       this.wholeIndex = 0
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "1";
      this.searchObj.buyCountSort = this.buyCountSort;
      this.searchObj.gmtCreateSort = this.gmtCreateSort;
      this.searchObj.priceSort = this.priceSort;
      this.gotoPage(this.page, this.limit, this.searchObj);
    },
    // 9. 查询全部，并清空所有条件
    selectAll() {
            //   '全部' 样式
       this.wholeIndex = 1
      this.buyCountSort = "";
      this.gmtCreateSort = "";
      this.priceSort = "";
      this.oneIndex = -1 
      this.twoIndex = -1 
      this.subSubjectList = []
      this.searchObj = {}
      this.gotoPage(this.page, this.limit, this.searchObj);
    }
  },
};
</script>

<style scoped>
.active {
  background: #68c69b;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>