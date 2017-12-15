<template>
  <div class='ListDetail'>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-input placeholder="企业名称" prefix-icon="el-icon-search" v-model="input21">
              <template slot="append" id="enterprise-index-check">搜&nbsp&nbsp索</template>
            </el-input>
          </el-col>
          <el-col :span="24" class="selecteType">
            <el-col :span="4">1</el-col>
            <el-col :span="20">2</el-col>
          </el-col>
          <el-col :span="24">
              行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业
          </el-col>
          <!-- 企业信息展示 -->
          <el-col :span="24" class="content">
              <el-col :span="6">
                <div class="imgInfo"><img src="" alt=""></div>
              </el-col>
              <el-col :span="15">
                <el-col :span="8">
                  <ul>
                    <h1>公司名称</h1>
                    <li v-for="item in data1">{{item}}</li>
                  </ul>
                </el-col>
                <el-col :span="16">
                  <ul>
                    <li>&nbsp</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                  </ul>
                </el-col>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" style="margin-top: 80px">查看企业详情</el-button>
              </el-col>
          </el-col>
          <!-- 分页 -->
          <el-col :span="24">
            <el-col :span="10">&nbsp</el-col>
            <el-col :span="14">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="10"
                background
                prev-text="上一页"
                next-text="下一页"
                layout="total, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </el-col>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input21: '',
      currentPage4: 4,
      data1: [
        '所属乡镇/村：',
        '所属行业：',
        '主要核心产品：',
        '地      址：',
        '联系方式：'
      ],
      selectType: [
        {
          index: 1,
          classify: '行业',
          type: ['不限', '化工']

        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 改变页数时回调
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-container {
  width: 1200px;
  margin: 0 auto;
  .el-main {
    .el-row {
      .content {
        border-bottom: 1px solid #d4e1ea;
        margin-bottom: 20px;
      }
      .selecteType{
        border: 1px solid #d4e1ea;
        margin: 20px 0;
      }
      .el-col {
        h1 {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 11px;
        }
        li {
          font-size: 14px;
          color: #666666;
          letter-spacing: 5px;
          padding-bottom: 11px;
        }
        .imgInfo {
          width: 264px;
          height: 176px;
          background-color: greenyellow;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
