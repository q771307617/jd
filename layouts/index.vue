<template>
  <div id="main" class="main">

    <div class="header">
      <div class="topbackground">
        <img class="frontHeader" src="./../assets/img/frontHeaderIcon.png" alt="">
      </div>
      <div class="nav">
        <p class="navLeft">
          <nuxt-link :to="{name:'front'}">首页</nuxt-link>
          <!-- <span></span> -->
          <img class="heightline" src="./../assets/img/heightLine.png" alt="">
          <nuxt-link :to="{name:'front-dataAnalysis'}">数据分析</nuxt-link>
          <!-- <span></span> -->
          <img class="heightline" src="./../assets/img/heightLine.png" alt="">
          <nuxt-link :to="{name:'front-enterprise'}">企业管理</nuxt-link>
        </p>
        <p class="navRight" @click="loginOut">
          <nuxt-link :to="{name:'index'}">
            <i class="el-icon-remove-outline"></i> 退出</nuxt-link>
        </p>
      </div>
    </div>
    <nuxt id="content" />
    <div class="footer" v-if="$route.name!='front'">
      <!-- <p>关于我们</p>
      <p>@2017 jiandezhengfuxinxi Reserved. 浙ICP备案15043816号-1 浙公网安备 33010902000325</p> -->
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import api from '~/plugins/api';
export default {
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  methods: {
    ...mapActions(['LIST_GET', 'USER_GET']),
    handleSelect(key, keyPath) {
    },
    shouye() {
      this.$router.push('/');
    },
    loginOut() {
      api.post('/user/logout')
        .then(e => {
          if (e.status === 200) {
            this.$router.push({ name: 'index' });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: error.msg
          });
        });
    },
    isPermissions() {
      api.get('user/info', {}).then(e => {
        if (e.status !== 200) {
          this.$message(e.msg);
        };
        if (e.data.type === 3) {
          this.loginOut();
        }
      });
    }
  },
  mounted() {
    window.localStorage.setItem('loginType', 'index');
    this.isPermissions();
    // this.USER_GET();
    this.LIST_GET();
  }
};
</script>

<style scoped lang="scss">

a {
  color: #fff;
}

.footer {
  width: 100%;
  min-width: 1200px;
  height: 60px;
  // max-height: 55px;
  text-align: center;
  background: #014bb2;
  // padding: 10px 0;
  color: #FFF;
  p {
    height: 20px;
    line-height: 20px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    padding: 3px;
  }
}
.heightline{
  display:inline-block;
  width:2px;
  margin-bottom: -10px;
}
.header {
  width: 100%;
  min-width: 1200px;
  background:#0267ca;
  background: -moz-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #0267ca), color-stop(100%, #072fa0));
  background: -webkit-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#0267ca), to(#072fa0));
  background: -webkit-linear-gradient(left, #0267ca, #072fa0);
  background: -o-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -ms-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: linear-gradient(to bottom, #0267ca 0%, #072fa0 100%);
  .topbackground{
    background:url(./../assets/img/frontHeaderBg.png)no-repeat;
    padding-left: 356px;
    height:100px;
    background-size:100% 100%;
    .frontHeader{
      margin-top: 10px;
    }
  }
}
.nav {
  width: 1200px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  z-index: 9999;
  .navLeft {
    width: 600px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    a {
      height: 40px;
      width: 90px;
      display: inline-block;
      text-align: center;
    }
    .span {
      background: -moz-linear-gradient(top, #072fa0 0%, #0267ca 50%, #072fa0 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #072fa0), color-stop(50%, #0267ca), color-stop(100%, #072fa0));
      background: -webkit-linear-gradient(top, #072fa0 0%, #0267ca 50%, #072fa0 100%);
      background: -o-linear-gradient(top, #072fa0 0%, #0267ca 50%, #072fa0 100%);
      background: -ms-linear-gradient(top, #072fa0 0%, #0267ca 50%, #072fa0 100%);
      background: linear-gradient(to bottom, #072fa0 0%, #0267ca 50%, #072fa0 100%);
      display: inline-block;
      border-radius: 5px;
      width: 1px;
      height: 38px;
      margin-bottom: -15px;
    }
  }
  .navRight {
    min-width: 600px;
    height: 40px;
    display: inline-block;
    text-align: right;
    a {
      height: 40px;
      width: 90px;
      display: inline-block;
    }
  }
  a:hover {
    color: #f54203;
  }
  .nuxt-link-exact-active {
    color: #ffbf50;
  }
}

#content {
  min-height: 810px;
  // max-height:3200px;
  height: auto; // width: 1200px;
  margin: 0 auto;
}
</style>
