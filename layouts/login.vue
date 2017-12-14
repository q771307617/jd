<template>
    <div class="login">
    <div class="container" :class="isType ? 'bg-admin' : 'bg-qian'">
      <div class="slogan">
          <p class="one">建德企业信息管理<span v-if="isType">后</span><span v-else>平</span>台</p>
          <hr style="margin:26px 0;">
          <p class="two">以企业为中心,以服务为核心</p>
      </div>
      <div class="content">
        <p class="text"><span v-if="isType">管理员</span>登录</p>
        <div class="demo-input-size">
            <el-input  placeholder="管理员账号" v-model="userInfo.username" class="input" autofocus>
              <i slot="prefix"></i>
            </el-input>
            <el-input placeholder="密码" type="password" v-model="userInfo.password" class="input">
              <i slot="prefix"></i>
            </el-input>
            <el-input placeholder="验证码" v-model="userInfo.code" class="input" style="width: 214px;margin-right:164px; ">
              <i slot="prefix"></i>
            </el-input>
          <el-button class="btn" @click="login">登录</el-button>
        </div>
      </div>
      <p class="three">@2017 jiandezhengfuxinxi  Reserved.   浙ICP备案15043816号-1  浙公网安备 33010902000325</p>
    </div>
      <nuxt/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        username: null,
        password: null,
        code: null,
        identity: null
      }
    };
  },
  methods: {
    login() {
      console.log();
    }
  },
  mounted() {
  },
  computed: {
    // 判断用户类型
    isType() {
      if (this.$route.name === 'login') {
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.login .container {
  width: 1920px;
  height: 1080px;
  position: relative;
  margin: 0 auto;
}
.bg-qian{
  background-image: url(../assets/img/bgFrontLogin.png);
}
.bg-admin{
  background-image: url(../assets/img/bgAdminLogin.png);
}
.login .container .slogan{
  position: absolute;
  top: 235px;
  left: 350px;
}
.login .container .slogan .one{
  font-size:48px;
  color:#ffffff;
  /* color:linear-gradient(-180deg, #88FAFF 0%, #69ADFF 97%); */
}
.login .container .slogan .two{
  font-size:18px;
  color:#ffffff;
}
.login .container .three{
  position: absolute;
  left: 695px;
  top: 975px;
  font-size:12px;
  color:#ffffff;
}
.login .container .content {
  background: #f7f7f7;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.39);
  border-radius: 8px;
  width: 540px;
  height: 546px;
  position: absolute;
  top: 222px;
  left: 1021px;
  text-align: center;
}
.login .container .content .text {
  font-size: 36px;
  color: #333333;
  text-align: center;
  padding: 58px 180px;
}
.el-input {
  background: #ffffff;
  border-radius: 3px;
  width: 378px;
  margin-bottom: 40px;
  font-size: 14px;
  color: #333333;
}
.el-input__inner{
  height: 44px !important;
  padding: 0;
}
.el-input__prefix{
  display: inline-block;
  width: 20px;
  height: 20px;
  font-style: normal;
  background-color: red;
  background: url(../assets/img/iconadmin.png) no-repeat -20px -20px;
}
.login .container .content .btn {
  background: #1c7bef;
  border-radius: 3px;
  width: 380px;
  height: 48px;
  font-size: 18px;
  color: #fff;
}
.el-input-group__prepend {
  background-color: #fff;
}
</style>



