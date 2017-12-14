<template>
<div>
  <div class="wrapper">
    <!-- 顶部 -->
    <div class="header">
      <div class="logo"><img class="logo-left" src="../assets/img/emblem.png">  后台管理系统</div>
   <div class="user-info">{{role}}{{name}}<a style="margin:0 30px;">退出</a></div>
    </div>
    <!-- 侧边栏 -->
    <div class="sidebar">
      <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
        <template v-for="item in menus">
              <template v-if="item.subs">
                <el-submenu :index="item.index">
                   <template slot="title"><i :class="item.icon"></i>{{ item.title }}
                   </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="item.index">
                    <i :class="item.icon"></i>{{ item.title }}
                  </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
	</div>
     <div class="content">
            <transition name="move" mode="out-in">	<nuxt/>	</transition>
     </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        onRoutes: ' ',
        name: '王厂长',
        role: '管理员',
        menus: [
          {
            icon: 'el-icon-setting',
            index: 'readme',
            title: '自述'
          },
          {
            icon: 'el-icon-menu',
            index: '2',
            title: '表格',
            subs: [
              {
                index: 'basetable',
                title: '基础表格'
              },
              {
                index: 'vuetable',
                title: 'Vue表格组件'
              }
            ]
          },
          {
            icon: 'el-icon-date',
            index: '3',
            title: '表单',
            subs: [
              {
                index: 'baseform',
                title: '基本表单'
              },
              {
                index: 'vueeditor',
                title: '编辑器'
              },
              {
                index: 'markdown',
                title: 'markdown'
              },
              {
                index: 'upload',
                title: '文件上传'
              }
            ]
          },
          {
            icon: 'el-icon-star-on',
            index: 'basecharts',
            title: '图表'
          },
          {
            icon: 'el-icon-upload2',
            index: 'drag',
            title: '拖拽'
          }
        ]
      };
    },
    computed: {
      username() {
        // let username = localStorage.getItem('ms_username');
        // return username ? username : this.name;
      }
    },
    methods: {
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
        if (typeof routerName !== 'string' || routerName.length <= 0) {
          return;
        };
        this.$router.push({
          name: routerName
        });
      }
    }
  };
</script>

<style scoped >
.wrapper{
    width:100%;
    height:100%;
    overflow: hidden;
}
.content{
  background: none repeat scroll 0 0 #fff;
  position: absolute;
  left: 250px;
  right: 0;
  top: 90px;
  bottom:0;
  width: auto;
  padding:40px;
  box-sizing: border-box;
  overflow-y: scroll;
}
  .el-menu-demo a {
    color: #fff;
    text-decoration: none;
    display: block;
  }
   .header {
     background-color:#5185de;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 90px;
        font-size: 22px;
        line-height: 90px;
        color: #fff;
    }
  .header .logo {
    display:flex;
    align-items: center;
    float: left;
    font-family:MicrosoftYaHei-Bold;
    font-size:34px;
    color:#ffffff;
    line-height: 90px;
    text-align: center;
  }
  .logo-left{
   margin-left:22px;
   padding-right: 30px;
   line-height: 90px;
   max-width:66px;
   max-height:68px;
  }
  .logo-user{
    max-width:66px;
   max-height:68px;
  }
  .user-info {
    float: right;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    font-size:16px;
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
    background-color:#354f8a;
    display: block;
    position: absolute;
    width: 230px;
    left: 0;
    top: 90px;
    bottom: 0;
  }
  .sidebar>ul {
    height: 100%;
  }

</style>
