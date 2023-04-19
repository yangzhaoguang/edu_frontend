<template>
<client-only>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="在线云课程">
            <img src="~/assets/img/logo.png"  width="280px" height="100px" alt="YZG.EDU"  />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="#" tag="li" active-class="current">
              <a  @click="tip">文章</a>
            </router-link>
            <router-link to="#" tag="li" active-class="current" >
              <a  @click="tip">问答</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>

            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span id="userName" class="vam disIb">{{loginInfo.nickname}}</span>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="logout()"
                class="ml5"
                >退出</a
              >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="/course" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  name="courseName"
                  value
                />
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接
              

            </span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="front.admin.vip" title="在线云课成平台" target="_blank"
                >在线云课成平台</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：110</span>
                <span>Email：994887644@qq.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归本平台所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
  </client-only>
</template>
<script>


import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"
import loginApi from "~/api/login.js";

import cookie from "js-cookie";
export default {
  data() {
    return {
      token: "",
      //  用户登录信息
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
    };
  },
  created() {
    // 获取到路径中的 token
    this.token = this.$route.query.token;
    if (this.token) {
      //  如果能取得到，获取用户信息
      this.wxLogin();
    }
      this.showInfo();
  },
  methods: {
    //  微信登录
    wxLogin() {
      // 将 token 存到 cookie 中
      // 如果部署在服务器上，增加域名 , { domain: ".yzgcf.vip" }
      cookie.set("guli_token", this.token);
      cookie.set('userInfo','')
      //  根据  token 获取用户信息
      //  由于有拦截器，如果 cookie 中有 token ，拦截器就会把 token放到 header中，每次请求都会携带
      //  后端通过 请求的header获取用户信息.
      loginApi.getUser().then((response) => {
        this.loginInfo = response.data.data.userInfo
        cookie.set("userInfo", JSON.stringify(this.loginInfo));
      });
    },
    showInfo() {
      // 从 cookie 中取出数据unescape
      var str = cookie.get("userInfo");
      // 从 cookie 中取出的数据是 JSON格式 的字符串，需要转换成JSON对象
      if (str) {
       
        this.loginInfo = JSON.parse(str)
      }
    },
    //  用户退出
    logout() {
      cookie.set("guli_token", "");
      cookie.set("userInfo", "");
      this.token=''
      window.location.href = "/";
    },
    tip() {
        this.$message({
          type: "error",
          message: "功能待完善...",
        });
    }
  },
};
</script>