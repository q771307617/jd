<template>
   <div class="pages">
      <el-pagination
        background
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 30, 50, 100, 200]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, total, jumper"
        :total="count">
      </el-pagination>
    </div>
</template>
<script>
export default {
  // count 总页数 pageNum 当前页码 每页条数 pageSize
  props: ['count', 'pageNum', 'pageSize'],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    pageSizeChange(val) {
      this.$emit('pageSizeChange', val);
    },
    pageCurrentChange(val) {
      this.$emit('pageCurrentChange', val);
    }
  }
};
</script>
<style scoped>
.pages{
  text-align: right;
  margin: 30px 0;
}
</style>