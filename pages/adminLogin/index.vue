<template>
    <div class="login">
    <div class="container bg-admin">
      <div class="slogan"></div>
      <div class="content">
        <p class="text">登录</p>
        <div class="demo-input-size">
          <div class="input-warnnp">
              <el-input  placeholder="管理员账号" v-model="loginIfon.username" class="input" autofocus @keyup.enter.native="submitLogin">
                <i slot="prefix" class="icon" style="background-position: -20px -18px;"></i>
              </el-input>
                <transition name="fade">
                  <p class="hint" v-if="!loginIfon.username">{{UserHint}}</p>
                </transition>
          </div>
          <div class="input-warnnp">
              <el-input placeholder="密码" type="password" v-model="loginIfon.password" class="input" :maxlength="20" @keyup.enter.native="submitLogin">
                <i slot="prefix" class="icon" style="background-position: -20px -54px;"></i>
              </el-input>
                <transition name="fade">
                  <p class="hint" v-if="!loginIfon.password">{{PasswordHint}}</p>
                </transition>
          </div>
            <div class="input-warnnp">
              <el-input placeholder="验证码" v-model="code" class="input" :maxlength="4" style="width: 214px;margin-right:164px;">
                <i slot="prefix" class="icon" style="background-position: -20px -88px;"></i>
              </el-input>
              <div class="loginCode"></div><i class="updateCode" @click="getCode"><img :src="verifycodeUrl" alt="" class="verifycode"></i>
                <transition name="fade">
                  <p class="hint" v-if="!code">{{CodeHint}}</p>
                </transition>
                  <p class="hint">{{msg}}</p>
            </div>
          <el-button class="btn" @click="submitLogin">登录</el-button>
        </div>
      </div>
    </div>
      <!-- <nuxt/> -->
  </div>
</template>
<script>
import api from '~/plugins/api';
// import qs from 'qs';
export default {
  layout: 'login',
  data() {
    return {
      loginIfon: {
        username: '',
        password: '',
        type: 3
      },
      code: '',
      UserHint: '',
      PasswordHint: '',
      CodeHint: '',
      verifycodeUrl: '',
      msg: '',
      statusCheckCode: false
    };
  },
  methods: {
    // 登录操作
    loginFun() {
      api.post('user/login', this.loginIfon).then(e => {
        if (e.status === 200) {
          this.$router.push({ name: 'admin' });
        } else {
          this.msg = e.msg;
          this.getCode();
        }
      });
    },
    // 提交登录
    submitLogin() {
      let userStatus = this.checkName(this.loginIfon.username);
      let passwordStatus = this.checkPassword(this.loginIfon.password);
      if (userStatus && passwordStatus) {
        this.checkCode(this.code, this.loginFun);
      }
    },
    // 验证用户名是否符合规则
    checkName(username) {
      if (username === '') {
        this.UserHint = '*请输入用户名!';
        return false;
      } else {
        // 验证空格
        let reg = /(^\s+)|(\s+$)/g;
        let regex = new RegExp(reg);
        if (!regex.test(username)) {
          return true;
        } else {
          this.loginIfon.username = '';
          this.UserHint = '*请输入用户名!';
          return false;
        }
      }
    },
    // 验证密码是否符合规则
    checkPassword(password) {
      if (password === '') {
        this.PasswordHint = '*请输入密码!';
        return false;
      } else {
        let reg = /(^\s+)|(\s+$)/g;
        let regex = new RegExp(reg);
        // 不存在空格且密码长度为6-20位
        if (!regex.test(password) && password.length > 5) {
          return true;
        } else {
          this.loginIfon.Password = '';
          this.PasswordHint = '*请输入密码!';
          return false;
        }
      }
    },
    checkCode(val, cb) {
      if (val === '') {
        this.CodeHint = '*请输入验证码!';
        this.getCode();
        return false;
      } else {
        api.post('/user/verify', { code: val }).then(e => {
          if (e.status === 200) {
            this.statusCheckCode = true;
            cb();
          } else {
            // this.code = '';
            this.getCode();
            this.msg = e.msg;
            this.statusCheckCode = false;
          }
        });
        return this.statusCheckCode;
      }
    },
    // 获取验证码
    getCode() {
      this.verifycodeUrl = '/api/user/verifycode?time=' + new Date().getTime();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getCode();
    });
  },
  computed: {}
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.login .container {
  max-width: 1200px;
  height: 1080px;
  position: relative;
  margin: 0 auto;
}
.login {
  background: url(../../assets/img/bgAdminLogin.png) no-repeat;
}
.slogan {
  width: 516px;
  height: 125px;
  position: absolute;
  top: 235px;
  /* left: 3%; */
  z-index: 10;
  background: url(../../assets/img/JdTilte.png) no-repeat;
}
.login .container .content {
  background: #f7f7f7;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.39);
  border-radius: 8px;
  width: 540px;
  height: 546px;
  position: absolute;
  top: 222px;
  left: 55%;
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
.input-warnnp {
  position: relative;
}
.hint {
  position: absolute;
  left: 85px;
  top: 45px;
  font-size: 12px;
  color: red;
}
.el-input__inner {
  padding: 0;
  margin-left: 50px;
}
.el-input__prefix {
  display: inline-block;
  width: 20px;
  height: 20px;
  font-style: normal;
  background-color: red;
  margin-left: 50px;
}
.icon {
  display: block;
  background: url(../../assets/img/iconBackground.png) no-repeat;
  width: 20px;
  height: 20px;
  margin: 10px 15px;
  font-style: normal;
}
.icon::after {
  content: '|';
  width: 1px;
  height: 29px;
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
.el-input /deep/ .el-input__inner {
  padding-left: 80px;
}
.loginCode {
  width: 111px;
  height: 40px;
  border: 1px solid #eee;
  position: absolute;
  top: 0;
  left: 312px;
}
.updateCode {
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
.updateCode img {
  display: inline-block;
  position: absolute;
  right: 34px;
  top: -11px;
  width: 113px;
  height: 40px;
}
</style>
