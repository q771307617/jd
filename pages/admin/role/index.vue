<template>
<div class="role">
  <el-col :span="24" class="top-title">
    <span class="top-type">账号管理</span>
    <el-button type="primary" class="top-btn" @click="addAccount = true">新增账号</el-button>
  </el-col>
  <el-col :span="24" style="text-align:center">
    <el-table :data="tableData" stripe border style="max-width: 100%;">
      <el-table-column prop="date" label="角色名称" min-width="150" header-align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" min-width="150" header-align="center"></el-table-column>
      <el-table-column label="账号状态" min-width="150" header-align="center">
          <template slot-scope="scope">
            <el-switch v-model="value3"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100" header-align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="addAccount = true" size="small" value="修改">修改</el-button>
          <el-button type="text" @click="deleteAccount = true" size="small" value="删除">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-col>

  <!-- 新增、修改账号弹出框 -->
  <el-dialog class="dialog"
    title="新增账号"
    :visible.sync="addAccount"
    width="640px"
    center>
      <el-form :label-position="labelPosition">
        <el-form-item label="角色名称">
          <el-input v-model="user" placeholder="请输入新增角色名称，可为汉字、数字、英文大小写、特殊字符"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user" placeholder="请输入用户名，可为数字、英文大小写、特殊字符"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user" type="password" placeholder="请输入6-20位数字、大小写英文、特殊字符"></el-input>
        </el-form-item>
        <el-form-item>
          <h1>登录权限</h1>
            <el-radio-group v-model="radio2">
              <el-radio :label="3">不限</el-radio>
              <el-radio :label="6">前台</el-radio>
              <el-radio :label="9">后台</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addAccount = false">取 消</el-button>
      <el-button type="primary" @click="addAccount = false">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog
    :visible.sync="deleteAccount"
    width="640px"
    center>
    <span style="position: absolute;left:20px;top:10px">删除账号</span>
    <div style="text-align:center">
       <h1 style="font-size:24px">是否继续删除<span>***</span>角色账号？</h1>
      <span style="color:#999999">温馨提示：账号删除后无法恢复，请谨慎操作！</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteAccount = false">取 消</el-button>
      <el-button type="primary" @click="deleteAccount = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '科长',
        name: '张三',
        address: ''
      }],
      currentPage4: 4,
      value3: true,
      labelPosition: 'top',
      radio2: 3,
      addAccount: false,
      updateAccount: false,
      deleteAccount: false,
      formLabelAlign: '',
      user: '',
      operationType: [
        {
          type: 'add',
          title: '新增账号',
          addAccount: true,
          roleName: '',
          username: '',
          password: ''
        },
        {
          type: 'update',
          title: '修改账号',
          addAccount: true,
          roleName: '',
          username: '',
          password: ''
        },
        {
          type: 'delete',
          title: '删除账号',
          addAccount: true,
          roleName: '',
          username: '',
          password: ''
        }
      ],
      centerDialogVisible: false
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
    // 弹出框

  }
};
</script>
<style scoped>
.footer-page {
  margin-top: 30px;
}
.top-title{
  border:1px solid #d4e1ea;
  border-radius:2px;
  height:86px;
  margin-bottom: 20px;
  line-height: 86px;
  text-align:justify;
}
.top-type{
  font-size:24px;
  color:#333333;
  padding-left: 40px;
}
.top-btn{
  width: 150px;
  height: 44px;
  float: right;
  margin: 20px 30px 0 0;
}
.dialog .el-input{
  background:#f7f7f7;
  border:1px solid #e0e0e0;
  border-radius:3px;
  width:518px;
}
.el-form-item{
  margin: 0 0 0 33px;
}
/* 深度击穿 */
.el-table /deep/ .el-table__body-wrapper{
  overflow: visible;
}
</style>

