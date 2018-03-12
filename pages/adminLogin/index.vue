<template>
  <div class="login">
    <div class="container bg-admin">
      <div class="slogan"></div>
      <login :type="type"></login>
    </div>
  </div>
</template>
<script>
import login from '~/components/login';
export default {
  data() {
    return {
      type: 3
    };
  },
  components: {
    login
  }
};
</script>
<style lang="scss" scoped>
.login {
  background: url(../../assets/img/bgAdminLogin.png);
  background-position: center 0;
  min-width: 1200px;
  .container {
    max-width: 1200px;
    height: 1080px;
    position: relative;
    margin: 0 auto;
    .slogan {
      width: 516px;
      height: 125px;
      position: absolute;
      top: 232px;
      left: 100px;
      z-index: 10;
      background: url(../../assets/img/JdTilte.png) no-repeat;
    }
  }
}
</style>
