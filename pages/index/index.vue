<template>
  <div class="login">
    <div class="container bg-admin">
      <div class="slogan">
        <p class="one">建德工业企业信息平台</p>
        <hr class="wire">
        <p class="two">以企业为中心,以服务为核心</p>
      </div>
      <login :type="type"></login>
    </div>
  </div>
</template>
<script>
import login from '~/components/login';
export default {
  data() {
    return {
      type: 2
    };
  },
  components: {
    login
  }
};
</script>
<style lang="scss" scoped>
.login {
  background-image: url(../../assets/img/bgFrontLogin.png);
  .container {
    max-width: 1200px;
    height: 1080px;
    position: relative;
    margin: 0 auto;
    .slogan {
      position: absolute;
      top: 232px;
      left: 160px;
      z-index: 10;
      color: #fff;
      .one {
        font-family: hzgb;
        font-weight: bold;
        font-size: 36px;
        color: #FFFFFF;
      }
      .two {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        color: #FFFFFF;
      }
      .wire {
        width: 374px;
        background-color: #fff;
        margin: 27px 0;
      }
    }
  }
}
</style>



