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
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>


<style scoped>
/* 深度击穿 */

.el-table /deep/ .el-table__body-wrapper {
  overflow: visible;
}
</style>
