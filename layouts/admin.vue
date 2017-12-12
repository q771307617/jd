<template>
    <div id='header' class = 'header'>
      <!-- 顶部 -->
      <div class="top">欢迎用户登录管理后台</div>
      <el-col :span="4">
        <el-menu 
          class="el-menu-demo"
          @open="handleOpen" 
          @close="handleClose" 
          @select="selectMenu" 
          :default-openeds="['1']" 
          background-color='#464c5b'
          text-color='#fff'
          active-text-color='#2d8cf0'
          >
            <el-submenu v-for="item in menus" :key="item.index" :index="item.index">
              <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
              <el-menu-item-group v-if="item.type === 'group'" v-for="el in item.children" :key="el.title">
                <template v-if="el.title" slot="title">{{el.title}}</template>
                <el-menu-item-group v-for="dl in el.children" :key="dl.title">
                  <el-menu-item v-if="dl.type === 'a'" index=""><a :href="dl.url" >{{dl.title}}</a></el-menu-item>
                  <el-menu-item v-else-if="dl.type === 'router'"  :index="dl.index">{{dl.title}}</el-menu-item>
                </el-menu-item-group>
              </el-menu-item-group>
              <el-menu-item-group  v-for="el in item.children" :key="el.title">
                <el-menu-item v-if="el.type === 'a'" index=""><a :href="el.url" >{{el.title}}</a></el-menu-item>
                <el-menu-item v-else-if="el.type === 'router'"  :index="el.index">{{el.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="custome">
              <i class="el-icon-setting"></i>
              <span slot="title">导航三</span>
            </el-menu-item> -->
          </el-menu>
      </el-col>
			<nuxt/>			
	</div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          index: '1',
          title: '企业管理',
          icon: 'el-icon-printer',
          type: 'group',
          children: [
            {
              title: '企业管理',
              url: '/admin',
              icon: 'el-icon-printer',
              type: 'a'
            }
          ]
        },
        {
          index: '2',
          title: '角色管理',
          icon: 'el-icon-service',
          type: '',
          children: [
            {
              title: '角色管理',
              url: '/admin/role',
              icon: 'el-icon-service',
              type: 'a'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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

<style scoped>
.el-menu-demo a{
  color: #fff;
  text-decoration: none;
  display: block;
}
.top{
  height:50px;
  line-height: 50px;
  background:#464c5b;
  padding: 0 30px;
  color: #fff;
}
</style>