<template>
  <div class="pages flex-box block">
    <!-- <p class="demonstration">共
                                  <span class="red">{{count}}</span>条数据
                                  <span style="margin-left:20px;">每页</span>
                                  <span class="red">{{pageSize}}</span>条</p> -->
    <el-pagination background @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page.sync="pageNum" prev-text=" < 上一页 " next-text=" 下一页 > " :page-size="pageSize" layout="prev, pager, next" :total="count">
    </el-pagination>
    <p style="line-height:28px;" v-if="count==0">第1页/共1页</p>
    <p style="line-height:28px;" v-else>第{{pageNum}}页/共{{Math.ceil(count/pageSize)}}页</p>
    <div style="margin-left:16px;">到第
      <el-input v-model="input" size="mini" style="width:46px;"></el-input>页</div>
    <div style="line-height:28px;margin-left:16px;">
      <el-button type="primary" size="mini" @click="pageCurrentNumChange">确定</el-button>
    </div>
  </div>
</template>
<script>
export default {
  // count 总页数 pageNum 当前页码 每页条数 pageSize
  props: ['count', 'pageSize'],
  data() {
    return {
      input: 1,
      pageNum: 1
    };
  },
  mounted() { },
  methods: {
    pageSizeChange(val) {
      this.$emit('pageSizeChange', val);
    },
    pageCurrentNumChange() {
      if (this.input) {
        this.pageNum = this.input;
        this.$emit('pageCurrentChange', Number(this.pageNum));
        if (this.input > Math.ceil(this.count / this.pageSize)) {
          if (this.count === 0) {
            this.input = 1;
          } else {
            this.input = Math.ceil(this.count / this.pageSize);
          }
          this.$emit('pageCurrentChange', Number(this.input));
        }
      }
    },
    pageCurrentChange(val) {
      this.pageNum = Number(val);
      this.$emit('pageCurrentChange', Number(this.pageNum));
    }
  },
  watch: {
    // 'pageNum'(val) {
    //   this.pageNum = Number(val);
    //   this.$emit('pageCurrentChange', Number(this.pageNum));
    // }
  }
};
</script>
<style scoped lang="scss">
.pages {
  text-align: right;
  margin: 30px 0;
}

.block {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .red {
    color: red;
  }
}
</style>
