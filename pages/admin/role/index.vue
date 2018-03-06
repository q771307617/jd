<template>
  <div class="role">
    <el-col :span="24" class="top-title">
      <span class="top-type">账号管理</span>
      <el-button type="primary" class="top-btn" @click="AccountoPeration(null)">新增账号</el-button>
    </el-col>
    <el-col :span="24" style="text-align:center">
      <el-table :data="PermissionList" border :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderClassName" style="max-width: 100%;"  element-loading-background="#fff">
        <el-table-column prop="name" label="账号名称" min-width="150" header-align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="150" header-align="center"></el-table-column>
        <el-table-column prop="type" label="权限" min-width="150" header-align="center">
          <div slot-scope="scope">
            {{loginSype[scope.row.type]}}
          </div>
        </el-table-column>
        <el-table-column label="账号状态" min-width="150" header-align="center">
          <div slot-scope="scope">
            <el-switch v-model="scope.row.status" style="height: 21px;" active-value="0" inactive-value="1" @change="SwitchStatus(scope.row)"></el-switch>
          </div>
        </el-table-column>
        <el-table-column label="操作" min-width="100" header-align="center">
          <div slot-scope="scope">
            <el-button type="text" size="small" value="修改" @click.stop="AccountoPeration(scope.row)">修改</el-button>
            <el-button type="text" size="small" value="删除" @click.stop="deleteAccount(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin:20px 0">
        <pages :pageSize=15 :count="totalData" @pageCurrentChange="handleCurrentChange"></pages>
      </div>
    </el-col>

    <!-- 新增、修改账号 -->
    <el-dialog class="dialog" :visible.sync="SelectStatus" width="640px" center>
      <h1 slot="title" style="font-size:24px;color:#333333;margin-top:20px">{{title}}</h1>
      <!-- <h1 slot="title" v-if="AccountoPeration">修改账号</h1> -->
      <el-form :label-position="labelPosition">
        <el-form-item label="账号名称">
          <el-input v-model="UserInfo.roleName" placeholder="请输入新增角色名称，可为汉字、数字、英文大小写、特殊字符" @keyup.enter.native="ConfirmPeration"></el-input>
        </el-form-item>
        <div class="bottomaera">
          <transition name="fade">
            <p class="hint">{{RoleNameHint}}</p>
          </transition>
        </div>
        <el-form-item label="用户名">
          <el-input v-model="UserInfo.username" :disabled="statusAbaled" placeholder=" 请输入新增用户名，可为数字、英文大小写、特殊字符" @keyup.enter.native="ConfirmPeration"></el-input>
        </el-form-item>
        <div class="bottomaera">
          <transition name="fade">
            <p class="hint">{{UserHint}}</p>
          </transition>
        </div>
        <el-form-item label="密码">
          <el-input v-model="UserInfo.password" placeholder="请输入6-20位数字、大小写英文、特殊字符" :maxlength="20" @keyup.enter.native="ConfirmPeration"></el-input>
        </el-form-item>
        <div class="bottomaera">
          <transition name="fade">
            <p class="hint">{{PasswordHint}}</p>
          </transition>
        </div>
        <el-form-item>
          <h1>登录权限</h1>
          <el-radio-group v-model="UserInfo.type">
            <el-radio :label="1">不限</el-radio>
            <el-radio :label="2">前台</el-radio>
            <el-radio :label="3">后台</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="bottomaera">
          <transition name="fade">
            <p class="hint" v-if="checkStatus">{{LimitHint}}</p>
          </transition>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SelectStatus = false" class="btn">取 消</el-button>
        <el-button @click="ConfirmPeration" type="primary" class="btn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除账号 -->
    <el-dialog :visible.sync="Delete.deleteStatus" width="640px" center>
      <span style="position: absolute;left:20px;top:10px">删除账号</span>
      <div style="text-align:center">
        <h1 style="font-size:24px;font-weight:500;margin-bottom:20px;">是否继续删除
          <span>{{Delete.userTitle}}</span>角色账号？</h1>
        <span style="color:#999999;">温馨提示：账号删除后无法恢复，请谨慎操作！</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Delete.deleteStatus = false" class="btn">取 消</el-button>
        <el-button type="primary" @click="ConfirmDelete" class="btn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '~/plugins/api';
import pages from '~/components/pages';
export default {
  data() {
    return {
      // loading: true,
      statusAbaled: false,
      loginSype: ['', '不限', '前台', '后台'],
      // 账户列表
      PermissionList: [],
      // 添加账户信息
      UserInfo: {
        password: '',
        roleName: '',
        type: 1,
        username: '',
        roleId: '',
        id: ''
      },
      // 删除账号
      Delete: {
        deleteStatus: false,
        deleteID: null,
        userTitle: null,
        roleId: null
      },
      // 修改账号
      User: {
        id: null,
        password: null,
        roleId: null,
        roleName: null,
        type: null,
        username: null
      },
      title: null,
      labelPosition: 'top',
      message: '',
      // 选择类型
      SelectStatus: false,
      activeType: null,
      UserHint: '',
      PasswordHint: '',
      RoleNameHint: '',
      LimitHint: '',
      currentPage: 0,
      totalPage: 0,
      totalData: 0
    };
  },
  components: {
    pages
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = Number(val);
      this.getCompanyList();
      // console.log(`当前页: ${val}`);
    },
    // 表格颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'warning-row';
      }
      return 'success-row';
    },
    tableHeaderClassName({ row, rowIndex }) {
      return 'warning-row';
    },
    // 账号列表
    getCompanyList() {
      api
        .get('/admin/user/list', {
          pageNum: this.currentPage,
          pageSize: 15
        })
        .then(e => {
          if (e.status === 200) {
            // setTimeout(() => {
            //   this.loading = false;
            // }, 0);
            this.PermissionList = e.data.list;
            this.totalData = e.data.count;
          } else {
            this.$message.error(e.msg);
          }
        });
    },
    // 禁用账号
    SwitchStatus(val) {
      // console.log(val);
      api
        .post('/admin/user/status', {
          id: val.id,
          status: val.status
        })
        .then(e => {
          if (e.status === 200) {
            this.$message({
              message: e.msg,
              type: 'success'
            });
          } else {
            if (e.status === 403) {
              this.getCompanyList();
            }
            this.$message.error(e.msg);
          }
        });
    },
    // 验证账号名是否符合规则
    checkRoleName(roleName) {
      if (roleName === '') {
        this.RoleNameHint = '请输入角色名称';
        return false;
      } else {
        // 验证空格
        let reg = /(^\s+)|(\s+$)/g;
        let regex = new RegExp(reg);
        if (!regex.test(roleName)) {
          return true;
        } else {
          this.roleName = '';
          this.RoleNameHint = '请输入正确的角色名称';
          return false;
        }
      }
    },
    // 验证用户名是否符合规则
    checkName(userName) {
      // console.log(userName);
      if (userName === '') {
        // console.log(123, userName);
        this.UserHint = '请输入用户名称';
        return false;
      }
      // 验证空格
      let reg = /(^\s+)|(\s+$)/g;
      let reg2 = /[^\u4e00-\u9fa5]/;
      let regex = new RegExp(reg);
      let regex2 = new RegExp(reg2);
      if (!regex.test(userName) && regex2.test(userName)) {
        // console.log(!regex2.test(userName));
        return true;
      }
      this.userName = '';
      this.UserHint = '请输入正确的用户名称';
      return false;
    },
    // 验证密码是否符合规则
    checkPassword(password) {
      // console.log(password);
      if (password === '') {
        this.PasswordHint = '请输入密码';
        return false;
      } else if (password === null) {
        return true;
      } else {
        let reg = /[^\u4e00-\u9fa5\s*|\s*$]/;
        let regex = new RegExp(reg);
        // 不存在空格且密码长度为6-20位
        if (
          // (regex.test(password) && password.length > 5) ||
          // password === '******'
          regex.test(password) &&
          password.length > 5
        ) {
          return true;
        } else {
          this.PasswordHint = '请输入正确的密码';
          return false;
        }
      }
    },
    // 是否选择类型
    checkStatus() {
      // console.log(this.UserInfo.type);
      if (this.UserInfo.type === '') {
        this.LimitHint = '请选择权限';
        this.SelectStatus = true;
        return false;
      }
      return true;
    },
    // 清空数据
    clearData() {
      this.UserInfo.password = '';
      this.UserInfo.roleName = '';
      this.UserInfo.type = '';
      this.UserInfo.username = '';
      this.PasswordHint = '';
      this.RoleNameHint = '';
      this.LimitHint = '';
      this.UserHint = '';
    },
    // 清空提示方法
    clearHint() {
      this.UserHint = '';
      this.PasswordHint = '';
      this.LimitHint = '';
      this.RoleNameHint = '';
    },
    // 添加,修改账号
    AccountoPeration(val) {
      if (val === null) {
        this.title = '新增账号';
        this.statusAbaled = false;
        this.activeType = 1;
        this.clearData();
      } else {
        this.clearData();
        // this.UserInfo.password = '******';
        this.UserInfo.password = null;
        this.title = '修改账号';
        this.UserInfo.roleName = val.name;
        this.UserInfo.username = val.username;
        this.UserInfo.type = val.type;
        this.activeType = 2;
        this.UserInfo.id = val.id;
        this.UserInfo.roleId = val.roleId;
        this.statusAbaled = true;
      }
      this.SelectStatus = true;
    },
    ConfirmPeration() {
      this.clearHint();
      let userRoleStatus = this.checkRoleName(this.UserInfo.roleName);
      let userStatus = this.checkName(this.UserInfo.username);
      let passwordRoleStatus = this.checkPassword(this.UserInfo.password);
      let optionStatus = this.checkStatus();
      if (userRoleStatus && passwordRoleStatus && userStatus && optionStatus) {
        let UserInfo = this.UserInfo;
        if (this.activeType === 1) {
          api.post('/admin/user/add', UserInfo).then(e => {
            if (e.status === 200) {
              this.getCompanyList();
              this.$message({
                message: e.msg,
                type: 'success'
              });
            } else {
              this.$message.error(e.msg);
            }
          });
        } else {
          api.post('/admin/user/update', UserInfo).then(e => {
            if (e.status === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getCompanyList();
            } else {
              this.$message.error('添加失败');
            }
          });
        }
        this.SelectStatus = false;
      }
    },
    // 删除账号
    deleteAccount(val) {
      this.Delete.deleteStatus = true;
      this.Delete.deleteID = val.id;
      this.Delete.userTitle = val.name;
      this.Delete.roleId = val.roleId;
    },
    ConfirmDelete() {
      api
        .post('/admin/user/delete', {
          id: this.Delete.deleteID,
          roleId: this.Delete.roleId,
          deleted: 1
        })
        .then(e => {
          if (e.status === 200) {
            this.$message({
              message: e.msg,
              type: 'success'
            });
            this.getCompanyList();
          } else {
            this.$message.error(e.msg);
          }
        });
      this.Delete.deleteStatus = false;
    }
  },
  created() {
    this.getCompanyList();
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.footer-page {
  margin-top: 30px;
}

.top-title {
  border: 1px solid #d4e1ea;
  border-radius: 2px;
  height: 86px;
  margin-bottom: 20px;
  line-height: 86px;
  text-align: justify;
}

.top-type {
  font-size: 24px;
  color: #333333;
  padding-left: 40px;
}

.top-btn {
  width: 150px;
  height: 44px;
  float: right;
  margin: 20px 30px 0 0;
}

.dialog .el-input {
  background: #f7f7f7;
  /* border: 1px solid #e0e0e0; */
  border-radius: 3px;
  width: 518px;
}

.btn {
  width: 150px;
  height: 44px;
  margin-right: 10px;
}

.el-form-item {
  margin: 0 0 0 33px;
}

.hint {
  margin-left: 33px;
  font-size: 12px;
  color: red;
  display: inline-block;
}

.bottomaera {
  height: 10px;
}


/* 深度击穿 */

.el-table /deep/ .el-table__body-wrapper {
  overflow: visible;
}
</style>

