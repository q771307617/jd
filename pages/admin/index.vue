<template>
  <div class="company">
    <div class="tittle">
      <span>企业管理</span>
      <div>
        <el-button class=" button one">数据导入</el-button>
        <el-button class=" button two" @click="change('add','0')">新增企业</el-button>
      </div>
    </div>
    <div class="company-table">
      <el-table :data="tableData" height="500" border :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderClassName" style="width: 100%">
        <el-table-column prop="createCompanyTime" label="上传时间" width="180">
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="230">
        </el-table-column>
        <el-table-column prop="tradeName" width="80" label="企业类型">
        </el-table-column>
        <el-table-column prop="townshipCommunity" label="所属乡镇村社">
        </el-table-column>
        <el-table-column prop="chargePersonName" label="主要负责人">
        </el-table-column>
        <el-table-column prop="chargePersonTelephone" label="联系电话">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="change('view',scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="change('edit',scope.row)">编辑</el-button>
</template>
        </el-table-column>
      </el-table>
      <div class="flex-box block">
        <p class="demonstration">共
          <span class="red">3256</span>条数据
          <span style="margin-left:20px;">每页</span>
          <span class="red">20</span>条</p>
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" prev-text=" < 上一页 " next-text=" 下一页 > " :current-page.sync="currentPage" :page-size="20" layout="prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 5,
      tableData: [{
        chargePersonName: '王二虎', // 负责人名字
        chargePersonTelephone: '18818881888', // 负责人联系电话
        companyAddress: '', // 企业详细地址
        companyId: '111', // 企业id
        companyName: '建德长风机械有限公司', // 企业名称
        createCompanyTime: '2016-05-04 15:25', // 企业的录入时间
        factoryImageUrl: '', // 企业图片的url
        mainProductName: '', // 主要产品
        townshipCommunity: '乾潭镇>莲花村>玉皇山社区', // 企业的乡镇社区
        tradeName: '机械' // 行业分类
      }, {
        chargePersonName: '王二虎', // 负责人名字
        chargePersonTelephone: '18818881888', // 负责人联系电话
        companyAddress: '222', // 企业详细地址
        companyId: '222', // 企业id
        companyName: '建德长风机械有限公司', // 企业名称
        createCompanyTime: '2016-05-04 15:25', // 企业的录入时间
        factoryImageUrl: '', // 企业图片的url
        mainProductName: '', // 主要产品
        townshipCommunity: '乾潭镇>莲花村>玉皇山社区', // 企业的乡镇社区
        tradeName: '机械' // 行业分类
      }, {
        chargePersonName: '王二虎', // 负责人名字
        chargePersonTelephone: '18818881888', // 负责人联系电话
        companyAddress: '', // 企业详细地址
        companyId: '333', // 企业id
        companyName: '建德长风机械有限公司', // 企业名称
        createCompanyTime: '2016-05-04 15:25', // 企业的录入时间
        factoryImageUrl: '', // 企业图片的url
        mainProductName: '', // 主要产品
        townshipCommunity: '乾潭镇>莲花村>玉皇山社区', // 企业的乡镇社区
        tradeName: '机械' // 行业分类
      }, {
        chargePersonName: '王二虎', // 负责人名字
        chargePersonTelephone: '18818881888', // 负责人联系电话
        companyAddress: '', // 企业详细地址
        companyId: '444', // 企业id
        companyName: '建德长风机械有限公司', // 企业名称
        createCompanyTime: '2016-05-04 15:25', // 企业的录入时间
        factoryImageUrl: '', // 企业图片的url
        mainProductName: '', // 主要产品
        townshipCommunity: '乾潭镇>莲花村>玉皇山社区', // 企业的乡镇社区
        tradeName: '机械' // 行业分类
      }]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'warning-row';
      }
      return 'success-row';
    },
    tableHeaderClassName({ row, rowIndex }) {
      return 'warning-row';
    },
    handleSizeChange() { //  每页条数
    },
    handleCurrentChange() { // 改变当前页码
    },
    change(val, row) {
      if (val === 'add') {
        this.$router.push({
          name: 'admin-company-addCompany',
          query: {
            type: val,
            companyId: row
          }
        });
      } else {
        this.$router.push({
          name: 'admin-company-addCompany',
          query: {
            type: val,
            companyId: row.companyId
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.company {
  .tittle {
    display: flex;
    justify-content: space-between;
    border: 1px solid #d4e1ea;
    border-radius: 2px;
    max-width: 1648px;
    min-width: 1200px;
    height: 86px;
    span {
      line-height: 86px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 24px;
      color: #333333;
      text-align: justify;
      margin-left: 40px;
    }
    .button {
      color: #fff;
      width: 150px;
      height: 44px;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      margin-top: 22px;
    }
    .one {
      background: #1c7bef;
      margin-right: 10px;
       :hover {
        background: #1373ea;
      }
    }
    .two {
      background: #27bc8d;
      margin-right: 30px;
       :hover {
        background: #22b284;
      }
    }
  }
  .company-table {
    margin-top: 18px;
  }
  .block {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .red {
      color: red;
    }
  }
}







/* 深度击穿 */

.el-table /deep/ .el-table__body-wrapper {
  overflow: visible;
}
</style>

