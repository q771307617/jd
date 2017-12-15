<template>
  <div class='hello'>
    <div class='add-company'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <hr>
      <br>
      <p class="navLeft">
        <nuxt-link :to="{name:'admin-company-addCompany'}">基本信息</nuxt-link>
        <span></span>
        <nuxt-link :to="{name:'admin-company-normData'}">指标数据</nuxt-link>
        <span></span>
      </p>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>


<style scoped>

</style>
