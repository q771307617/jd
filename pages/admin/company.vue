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
        <span></span>
        <span></span>
      </p>
      <el-radio-group v-model="radio" fill="#f2ba55" @change="change">
        <el-radio-button label="admin-company-addCompany">基本信息</el-radio-button>
        <el-radio-button label="admin-company-normData"> 指标数据</el-radio-button>
      </el-radio-group>
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 'admin-company-addCompany'
    };
  },
  methods: {
    change(val) {
      this.$router.push({
        name: val,
        query: {
          type: this.$route.query.type,
          companyId: this.$route.query.companyId
        }
      });
    }
  }
};
</script>


<style scoped>
/* 深度击穿 */

.el-table /deep/ .el-table__body-wrapper {
  overflow: visible;
}
</style>
