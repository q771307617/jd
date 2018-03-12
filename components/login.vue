<template>
  <div class="content">
    <p class="text">登录</p>
    <div style="margin-right:30px:position:relative">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="38px">
        <el-form-item label="" prop="username">
          <i class="icon" style="background-position: -20px -18px;"></i>
          <el-input type="text" v-model="ruleForm.username" placeholder="用户名" autofocus auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <i class="icon" style="background-position: -20px -54px;"></i>
          <el-input type="password" v-model="ruleForm.password" placeholder="密码" :maxlength="20" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <i class="icon" style="background-position: -20px -88px;"></i>
          <el-input v-model="ruleForm.code" :maxlength="4" class="code" placeholder="验证码" @keydown.enter.native="submitForm('ruleForm')" auto-complete="off" @blur="addBorderCss"></el-input>
          <div class="loginCode"></div>
          <i class="updateCode" @click="getCode"><img :src="verifycodeUrl" alt="" class="verifycode"></i>
        </el-form-item>
        <span class="hint">{{msg}}</span>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '~/plugins/api';
export default {
  props: ['type'],
  data() {
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]+$/;
      let regex = new RegExp(reg);
      if (!value) {
        return callback(new Error('请输入验证码!'));
      } else {
        if (!regex.test(value)) {
          callback(new Error('请输入正确的验证码!'));
        } else {
          if (this.isbulr) {
            this.checkCode(value, callback);
          }
        }
      }
    };
    // 验证用户名
    var validateUser = (rule, value, callback) => {
      let reg = /(^\s+)|(\s+$)/g;
      let regex = new RegExp(reg);
      if (!value) {
        callback(new Error('请输入用户名!'));
      } else {
        if (regex.test(value)) {
          callback(new Error('请输入正确的用户名!'));
        }
        callback();
      }
    };
    // 验证密码
    var validatePass = (rule, value, callback) => {
      let reg = /(^\s+)|(\s+$)/g;
      let regex = new RegExp(reg);
      if (!value) {
        callback(new Error('请输入密码!'));
      } else {
        if (regex.test(value) || value.length < 6) {
          callback(new Error('请输入正确的密码!'));
        }
        callback();
      }
    };
    return {
      verifycodeUrl: '',
      statusCode: false,
      msg: '',
      isbulr: '',
      ruleForm: {
        password: '',
        username: '',
        code: '',
        type: ''
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 获取验证码
    getCode() {
      this.verifycodeUrl = '/api/user/verifycode?time=' + new Date().getTime();
    },
    // 验证验证码
    checkCode(value, callback) {
      api
        .post('/user/verify', {
          code: value
        })
        .then(e => {
          if (e.status === 200) {
            callback();
          } else {
            callback(new Error('验证码错误!'));
            this.getCode();
          }
        });
    },
    // 登录提交
    submitForm(formName) {
      this.isbulr = true;
      this.msg = '';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginFun();
        } else {
          return false;
        }
      });
    },
    // 登录接口调用
    loginFun() {
      api
        .post('user/login', { ...this.ruleForm })
        .then(e => {
          if (e.status === 200) {
            switch (this.type) {
              case 2:
                this.$router.push({ name: 'front' });
                break;
              case 3:
                this.$router.push({ name: 'admin' });
                break;
            }
          } else {
            this.msg = e.msg;
            this.getCode();
          }
        });
    },
    addBorderCss() {
      this.isbulr = false;
    }
  },
  mounted() {
    this.ruleForm.type = this.type;
    this.$nextTick(() => {
      this.getCode();
    });
  }
};
</script>
<style lang="scss" scoped>
.login {
  .container {
    max-width: 1200px;
    height: 1080px;
    position: relative;
    margin: 0 auto;
    .content {
      background: #f7f7f7;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.39);
      border-radius: 8px;
      width: 415px;
      height: 430px;
      position: absolute;
      top: 224px;
      left: 55%;
      text-align: center;
      .text {
        font-family: MicrosoftYaHei;
        font-size: 32px;
        color: #333333;
        text-align: center;
        padding: 31px 166px;
      }
      .btn {
        background: #1c7bef;
        border-radius: 3px;
        width: 340px;
        height: 42px;
        font-size: 18px;
        color: #fff;
      }
      .hint {
        position: absolute;
        left: 38px;
        bottom: 90px;
        font-size: 12px;
        color: #f56c6c;
      }
      .icon {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        background: url(../assets/img/iconBackground.png) no-repeat;
        width: 20px;
        height: 20px;
        margin: 10px 20px;
        font-style: normal;
      }
      .icon::after {
        content: '|';
        position: absolute;
        left: 0;
        top: -10px;
        width: 1px;
        height: 29px;
        margin-left: 38px;
        color: #bbb;
      }
      .code {
        width: 181px;
        margin-right: 164px;
      }
      .loginCode {
        width: 111px;
        height: 40px;
        position: absolute;
        top: 0;
        left: 312px;
      }
      .updateCode {
        display: inline-block;
        width: 16px;
        height: 16px; // background-color: red;
        position: absolute;
        top: 12px;
        left: 326px;
        cursor: pointer;
        background: url(../assets/img/iconFront.png) no-repeat -10px -123px;
        img {
          display: inline-block;
          position: absolute;
          right: 34px;
          top: -11px;
          width: 110px;
          height: 40px;
        }
      }
    }
  }
}

.el-form-item {
  margin: 0 60px 40px 0;
  position: relative;
  .el-input {
    background: #ffffff;
    border-radius: 3px;
    width: 340px;
    font-size: 14px;
    color: #333333;
  }
  .input-warnnp {
    position: relative;
  }
}

.el-input /deep/ .el-input--prefix,
.el-input /deep/ .el-input__inner {
  padding-left: 80px;
}
</style>

