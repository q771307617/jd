<template>
    <div class="login">
      <div class="slogan">
          <p class="one">{{title[1]}}</p>
          <hr style="margin:26px 0;">
          <p class="two">以企业为中心,以服务为核心</p>
      </div>
      <p class="three">@2017 jiandezhengfuxinxi  Reserved.   浙ICP备案15043816号-1  浙公网安备 33010902000325</p>
      <nuxt/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: ['建德企业信息管理平台', '建德企业信息管理后台']
    };
  }
};
</script>
<style lang="scss" scoped>
.login{
  position: relative;
  .slogan{
    position: absolute;
    top: 235px;
    left: 350px;
    z-index: 10;
    .one{
      font-size:48px;
      color:#ffffff;
      // color:linear-gradient(-180deg, #88FAFF 0%, #69ADFF 97%);
    }
    .two{
      font-size:18px;
      color:#ffffff;
    }
  }
  .three{
    position: absolute;
    z-index: 10;
    left: 695px;
    top: 975px;
    font-size:12px;
    color:#ffffff;
  }
}
</style>



