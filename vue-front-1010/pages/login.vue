<template>
<client-only>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="手机号" v-model="user.mobile" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              href="http://localhost:8160/api/ucenter/wx/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </client-only>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import cookie from "js-cookie";
import loginApi from "~/api/login.js";

export default {
  layout: "sign",

  data() {
    return {
      user: {
        mobile: "",
        password: "",
      },
      loginInfo: {},
      loginMsg: ''
    };
  },

  methods: {
    // 登录
    submitLogin() {
      // 第一步: 调用接口login方法
      loginApi.login(this.user).then((response) => {
        console.log(response)
        // 第二步: 将 token 放入 cookie 中
        //  第一个参数: cookie 的 key 值
        //  第二个参数: cookie 的 value 值
        //  第三个参数: cookie 的 作用范围
        cookie.set("guli_token", response.data.data.token)
        // 第四步: 获取用户信息，并将用户信息保存到 cookie 中
        loginApi.getUser().then(response => {
          //  由于后端返回的是 JSON 对象，而 cookie 中只能存储 字符串，所以把 JSON 对象转换成 JSON 字符串.yzgcf.vip
          this.loginInfo = response.data.data.userInfo
          console.log(JSON.stringify(this.loginInfo))
          cookie.set("userInfo",JSON.stringify(this.loginInfo))
        })
        // 跳转首页,使用 $router.push 也可以
        // 
        if (response.data.code == 20001){
          console.log("登录失败")
            this.$message({
            type: "error",
            message: '密码错误或手机号不存在'
          });
          return false ;
        }

        this.$message({
            type: "success",
            message: '登录成功'
          });
        // window.location.href = '/'
        // this.$route.push
        window.open("/")
        // return false;
        
      });
    },

    // 自定义手机号码校验规则
    checkPhone(rule, value, callback) {
      //debugger
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>