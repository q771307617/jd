<template>
  <div>
    <div class="wrapper">
      <!-- 顶部 -->
      <div class="header">
        <div class="logo"><img class="logo-left" src="../assets/img/emblem.png">后台管理系统</div>
        <div class="user-info">{{info.name}}{{info.username}}
          <a style="margin:0 30px;cursor:pointer" @click="loginOut">退出</a>
        </div>
      </div>
      <!-- 侧边栏 -->
      <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" text-color="#7792d0" background-color="#4d67a4" active-text-color="#fff" unique-opened @select="selectMenu">
          <div v-for="item in menus" :key="item.index">
            <div v-if="item.subs">
              <el-submenu :index="item.index" :key="item.index">
                <div slot="title">
                  <div :class="[item.icon, status== item.index? item.index : '']"></div>
                  <span style="font-size:20px;">{{ item.title }}</span>
                </div>
                <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-else>
              <el-menu-item :index="item.index" :key="item.index">
                <div :class="[item.icon, status== item.index? item.index : '']"></div>
                <span style="font-size:20px;">{{ item.title }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <transition name="move" mode="out-in">
        <nuxt/> </transition>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import api from '~/plugins/api';
export default {
  data() {
    return {
      onRoutes: 'admin',
      name: '王厂长',
      role: '管理员',
      status: 'admin',
      menus: [
        {
          icon: 'companyIcon',
          index: 'admin',
          title: '企业管理'
        },
        {
          icon: 'roleIcon',
          index: 'admin-role',
          title: '角色管理'
          // subs: [
          //   {
          //     index: 'basetable',
          //     title: '基础表格'
          //   },
          //   {
          //     index: 'vuetable',
          //     title: 'Vue表格组件'
          //   }
          // ]
        }
        //     {
        //       icon: 'el-icon-date',
        //       index: '3',
        //       title: '表单',
        //       subs: [
        //         {
        //           index: 'baseform',
        //           title: '基本表单'
        //         },
        //         {
        //           index: 'vueeditor',
        //           title: '编辑器'
        //         },
        //         {
        //           index: 'markdown',
        //           title: 'markdown'
        //         },
        //         {
        //           index: 'upload',
        //           title: '文件上传'
        //         }
        //       ]
        //     },
        //     {
        //       icon: 'el-icon-star-on',
        //       index: 'basecharts',
        //       title: '图表'
        //     },
        //     {
        //       icon: 'el-icon-upload2',
        //       index: 'drag',
        //       title: '拖拽'
        //     }
      ]
    };
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  mounted() {
    window.localStorage.setItem('loginType', 'admin');
    this.isPermissions();
    this.LIST_GET();
    this.USER_GET();
  },
  methods: {
    ...mapActions(['LIST_GET', 'USER_GET']),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand() {
    },
    // 菜单激活回调
    selectMenu(routerName) {
      this.status = routerName;
      if (typeof routerName !== 'string' || routerName.length <= 0) {
        return;
      };
      this.$router.push({
        name: routerName
      });
    },
    loginOut() {
      api.post('/user/logout')
        .then(e => {
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: error.msg
          });
        });
    },
    isPermissions() {
      api.get('user/info', {}).then(e => {
        if (e.status !== 200) return;
        console.log(e.data.type);
        if (e.data.type === 2) {
          location.href = '/login/adminLogin';
          this.loginOut();
        }
      });
    }
  }
};
</script>

<style scoped >
.wrapper {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  overflow: hidden;
}

.content {
  background: none repeat scroll 0 0 #fff;
  position: absolute;
  left: 250px;
  right: 0;
  top: 108px;
  bottom: 0;
  width: auto;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
}

.el-menu-demo a {
  color: #fff;
  text-decoration: none;
  display: block;
}

.header {
  background-color: #5185de;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 90px;
  font-size: 22px;
  line-height: 90px;
  color: #fff;
}

.header .logo {
  display: flex;
  align-items: center;
  float: left;
  font-family: MicrosoftYaHei-Bold;
  font-size: 34px;
  color: #ffffff;
  line-height: 90px;
  text-align: center;
}

.logo-left {
  margin-left: 22px;
  padding-right: 30px;
  line-height: 90px;
  max-width: 66px;
  max-height: 68px;
}

.logo-user {
  max-width: 66px;
  max-height: 68px;
}

.user-info {
  float: right;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.top-admin {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-bottom: -9px;
  margin-right: 30px;
  background: url(../assets/img/iconBackground.png) no-repeat;
  background-position: -21px -291px;
}

.companyIcon {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 30px;
  background: url(../assets/img/iconBackground.png) no-repeat;
  background-position: -21px -165px;
}

.admin {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 30px;
  background: url(../assets/img/iconBackground.png) no-repeat;
  background-position: -21px -123px;
}

.roleIcon {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 30px;
  background: url(../assets/img/iconBackground.png) no-repeat;
  background-position: -21px -249px;
}

.admin-role {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  margin-left: 30px;
  background: url(../assets/img/iconBackground.png) no-repeat;
  background-position: -21px -208px;
}

.user-info .el-dropdown-link {
  position: relative;
  display: inline-block;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  vertical-align: middle;
}

.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-menu__item {
  text-align: center;
}

.sidebar {
  background-color: #354f8a;
  display: block;
  position: absolute;
  font-size: 20px;
  width: 230px;
  left: 0;
  top: 90px;
  bottom: 0;
}

.sidebar>ul {
  height: 100%;
}
</style>
