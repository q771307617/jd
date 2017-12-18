<template>
    <div class="login bg-qian">
    <div class="container">
      <div class="content">
        <p class="text">登录</p>
        <div class="demo-input-size">
            <el-input  placeholder="管理员账号" v-model="userInfo.username" class="input" autofocus>
              <i slot="prefix" class="icon" style="background-position: -20px -18px;"></i>
            </el-input>
            <el-input placeholder="密码" type="password" v-model="userInfo.password" class="input">
              <i slot="prefix" class="icon" style="background-position: -20px -54px;"></i>
            </el-input>
            <div style="position:relative">
              <el-input placeholder="验证码" v-model="userInfo.code" class="input" style="width: 214px;margin-right:164px; ">
                <i slot="prefix" class="icon" style="background-position: -20px -88px;"></i>
              </el-input>
              <div class="loginCode"></div><i class="updateCode"></i>
            </div>
          <el-button class="btn" @click="login">登录</el-button>
        </div>
      </div>
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
  //   isType() {
  //     if (this.$route.name === 'login') {
  //       return false;
  //     }
  //     return true;
  //   }
  }
};
</script>
<style scoped>
.login .container {
  width: 1920px;
  height: 1080px;
  position: relative;
  margin: 0 auto;
}
.bg-qian{
  background-image: url(../../assets/img/bgFrontLogin.png);
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
  padding: 0;
  margin-left: 50px;
}
.el-input__prefix{
  display: inline-block;
  width: 20px;
  height: 20px;
  font-style: normal;
  background-color: red;
  margin-left: 50px;
}
.icon{
  display: block;
  background: url(../../assets/img/iconBackground.png) no-repeat;
  width:20px;
  height:20px;
  margin: 10px 15px;
  font-style: normal
}
.icon::after{
  content: "|";
  width:1px;
  height:29px;
  margin-left: 38px;
}
.login .container .content .btn {
  background: #1c7bef;
  border-radius: 3px;
  width: 380px;
  height: 48px;
  font-size: 18px;
  color: #fff;
}
.el-input /deep/ .el-input--prefix,
.el-input /deep/ .el-input__inner{
  padding-left: 80px;
}
.loginCode{
  width: 111px;
  height: 40px;
  border: 1px solid #eee;
  position: absolute;
  top: 0;
  left: 312px;
  }
.updateCode{
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: red;
  position: absolute;
  top: 12px;
  left: 443px;
  cursor: pointer;
  background: url(../../assets/img/iconFront.png) no-repeat -10px -123px;
}
</style>



