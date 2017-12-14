<template>
<div class="role">
  <el-col style="text-align:center">
    <el-table :data="tableData" stripe border style="max-width: 98%;">
      <el-table-column prop="date" label="角色名称" min-width="150" header-align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" min-width="150" header-align="center"></el-table-column>
      <el-table-column prop="address" label="账号状态" min-width="150" header-align="center">
        <!-- <el-switch v-model="value3" active-text="按月付费" inactive-text="按年付费"></el-switch> -->
      </el-table-column>
      <el-table-column label="操作" min-width="100" header-align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" style="floa:right"></el-pagination>
  </el-col>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: ''
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: ''
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: ''
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: ''
      }]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="scss">
.role {
  margin-left: 260px;
  max-width: 100%;
}
.el-table__body-wrapper{
  overflow: visible;
}
</style>

