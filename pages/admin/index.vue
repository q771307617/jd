<template>
  <div class="company">
    <div class="tittle">
      <span>企业管理</span>
      <div class="right-box">
        <el-input placeholder='请输入企业名称' class="search" v-model="params.companyName" @keyup.enter.native="Search(params.companyName)" style="margin-right:10px;">
          <el-button slot='append' class="search-btn" size="small" style='margin:0 -20px;color:#fff;' @click="Search(params.companyName)" icon='el-icon-search'></el-button>
        </el-input>
        <el-upload class="upload" action="/api/admin/company/import" :on-preview="handlePreview" :on-error="handleError" :show-file-list="false" :on-success="handleSuccess">
          <el-button class=" button" style="line-height: 10px;background: #1C7BEF;">数据导入</el-button>
        </el-upload>
        <el-button class=" button two" type="success" @click="change('add','null')" style="line-height: 10px;">新增企业</el-button>
      </div>
    </div>
    <div class="company-table">
      <el-table :data="tableData" border :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderClassName">
        <el-table-column prop="createCompanyTime" label="上传时间" width="140">
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" width="230">
        </el-table-column>
        <el-table-column prop="tradeName" width="80" label="企业类型">
        </el-table-column>
        <el-table-column prop="townshipCommunity" label="所属乡镇村社">
          <div slot-scope="scope">
            {{scope.row.townName}}>{{scope.row.villageName}}
          </div>
        </el-table-column>
        <el-table-column prop="chargePersonName" label="主要负责人" width="100">
        </el-table-column>
        <el-table-column prop="chargePersonTel" label="联系电话">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <div slot-scope="scope">
            <el-button @click="change('view',scope.row)" type="text" size="small">查看/修改</el-button>
            <!-- <el-button type="text" size="small" @click="change('view',scope.row)"></el-button> -->
            <el-button type="text" size="small" @click="deleteCompany(scope.row)" style="color:red;">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- <div class="flex-box block">
                              <p class="demonstration">共
                                <span class="red">{{params.count}}</span>条数据
                                <span style="margin-left:20px;">每页</span>
                                <span class="red">{{params.pageSize}}</span>条</p>
                              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" prev-text=" < 上一页 " next-text=" 下一页 > " :current-page.sync="params.pageNum" :page-size="params.pageSize" layout="prev, pager, next, jumper" :total="params.count">
                              </el-pagination>
                            </div> -->
      <pages :pageSize=20 :count="params.count" @pageCurrentChange="handleCurrentChange"></pages>
    </div>
    <el-dialog :visible.sync="data" width="640px" center>
      <div style="text-align:center;">
        <i class="el-icon-success" style="text-align:center;color:#01d928;font-size:66px;" v-if="fileStatus"></i>
        <i class="el-icon-warning" style="text-align:center;color:#ff3f20;font-size:66px;" v-else></i>
      </div>
      <div style="text-align:center;">
        <div style="font-size:24px;margin-top:21px;" v-if="fileStatus">企业信息数据导入成功！</div>
        <div style="font-size:24px;margin-top:21px;" v-else>企业信息数据导入失败，请重新导入！
          <p style="text-align:center;color:orange;margin-top:20px;font-size:16px;">{{message}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <el-dialog :visible.sync="deleteCom" width="640px" center>
      <div style="text-align:center;">
        <h1 style="font-size:24px;margin-top:21px;">是否继续删除{{company.companyName}}企业信息？</h1>
      </div>
      <div style="text-align:center;color:#999999;margin-top:20px;">
        <p>温馨提示：企业信息删除后无法恢复，请谨慎操作！</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteCom = false" style="background:#fff;border-radius:3px;width:150px;height:44px;">取 消</el-button>
        <el-button type="primary" @click="deleteSure" style="background:#1c7bef;border-radius:3px;width:150px;height:44px;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from './../../plugins/api.js';
import moment from 'moment';
import pages from './../../components/pages';
export default {
  data() {
    return {
      data: false,
      fileStatus: true,
      deleteCom: false,
      message: null,
      scrollY: '',
      company: {
        companyId: null,
        companyName: ''
      },
      params: {
        companyName: '',
        pageNum: 1,
        pageSize: 20,
        keywords: '',
        count: 0
      },
      tableData: []
    };
  },
  components: {
    pages
  },
  mounted() {
    this.getcompanyInfo(true);
    window.onscroll = (event) => {
      this.scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    };
  },
  methods: {
    Scroll(Number) {
      setTimeout(() => {
        window.scroll(0, Number);
      }, 1000);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handleSuccess(res) {
      if (res.status === 200) {
        this.data = true;
        this.fileStatus = true;
        this.getcompanyInfo();
      } else {
        this.handleError();
        // this.$message.error(res.msg);
        this.message = res.msg;
      }
    },
    handleError() {
      this.data = true;
      this.fileStatus = false;
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，请选择1个文件`);
    },
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
      this.getcompanyInfo();
    },
    handleCurrentChange(val) { // 改变当前页码
      this.params.pageNum = Number(val);
      this.getcompanyInfo();
    },
    // 企业名称搜索
    Search(val) {
      this.params.companyName = val === '' ? null : val;
      this.getcompanyInfo();
    },
    getcompanyInfo(type) {
      api.get('company/getcompany', this.params).then((e) => {
        if (e.status === 200) {
          this.tableData = e.data.list;
          this.params.count = e.data.count;
          this.tableData.map((i) => {
            i.createCompanyTime = moment(i.createCompanyTime).format('YYYY-MM-DD HH:mm');
          });
          if (type) {
            this.Scroll(this.$route.query.scrollY);
          }
        }
      }).catch(err => {
        this.$notify.error({
          title: '获取企业信息失败',
          message: err.msg
        });
      });
    },
    change(val, row) {
      let showInput = 'yes';
      if (val === 'view') {
        row = row.companyId;
        showInput = 'no';
      } else if (val === 'edit') {
        row = row.companyId;
        showInput = 'yes';
      }
      this.$router.push({
        name: 'admin-company-addCompany',
        query: {
          type: val,
          companyId: row,
          showInput: showInput,
          scrollY: this.scrollY
        }
      });
      // window.localStorage.setItem('type', val);
      // window.localStorage.setItem('companyId', row);
      // window.localStorage.setItem('showInput', showInput);
    },
    deleteCompany(val) {
      this.deleteCom = true;
      this.company = val;
    },
    deleteSure() {
      this.deleteCom = false;
      api.post('admin/company/delete', { deleted: 1, id: this.company.companyId }).then((e) => {
        if (e.status === 200) {
          this.$message({
            message: '删除企业成功',
            type: 'success'
          });
          this.getcompanyInfo();
        } else {
          this.$message.error(e.msg);
        }
      });
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
    height: 86px;
    span {
      line-height: 86px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 24px;
      color: #333333;
      text-align: justify;
      margin-left: 40px;
    }
    .right-box {
      position: relative;
      .search {
        width: 420px;
        position: absolute;
        bottom: 28px;
        right: 300px;
        .search-btn {
          width: 43px;
          height: 33px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: #1C7BEF;
        }
      }
    }

    .search /deep/ .el-input__inner {
      height: 34px;
      border-right: 0;
    }
    .search /deep/ .el-input-group__append {
      height: 32px;
      position: relative;
      bottom: 1px; // border: 0px;
    }
    .button {
      color: #fff;
      width: 130px;
      height: 34px;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      margin: 22px 10px 0 0;
      background-color: #27BC8D;
    }
    .upload {
      display: inline;
    }
    .one {
      background: #1c7bef;
      margin-right: 10px;
    }
    .two {
      // background: #27bc8d;
      margin-right: 30px;
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

