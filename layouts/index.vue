<template>
    <div id="main" class = "main">

			<div class="header">
				<p><img src="./../assets/img/frontHeader.png" alt=""></p>
				<div class="nav">
					<p class="navLeft">
						<nuxt-link :to="{name:'index'}">首页</nuxt-link><span></span>
						<nuxt-link :to="{name:'index-dataAnalysis'}">数据分析</nuxt-link><span></span>
						<nuxt-link :to="{name:'index-enterprise'}">企业管理</nuxt-link>
					</p>
					<p class="navRight"><a href="javascript:">退出</a></p>
				</div>
			</div>
			<nuxt class="content"/>
			<div class="footer" v-if="$route.name!='index'">底部</div>
				
	</div>

</template>
<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    shouye() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped lang="scss">
.nuxt-link-active {
  color: #f54203;
}
a {
  color: #fff;
}
.footer {
  width: 100%;
  min-width:1200px;
  min-height: 130px;
  line-height: 130px;
  text-align: center;
  background: #545c64;
}
.header {
  width: 100%;
  min-width:1200px;
  background: -moz-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -webkit-gradient(linear,left top,left bottom,color-stop(0%, #0267ca),color-stop(100%, #072fa0));
  background: -webkit-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -o-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: -ms-linear-gradient(top, #0267ca 0%, #072fa0 100%);
  background: linear-gradient(to bottom, #0267ca 0%, #072fa0 100%);
}
.header p {
  height: 100px;
}
.header p img {
  width: 100%;
  min-width:1200px;
  height: 101px;
  margin:0 auto;
}

.nav {
  width: 1200px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto ;
  
  .navLeft {
    width: 600px;
    height: 40px;
    line-height:40px;
    display: inline-block;
    a {
      height: 40px;
      width: 90px;
      display: inline-block;
      text-align: center;
    }
    span{
      background: -moz-linear-gradient(top, #0267ca 0%, #072fa0 100%);
      background: -webkit-gradient(linear,left top,left bottom,color-stop(0%, #0267ca),color-stop(100%, #072fa0));
      background: -webkit-linear-gradient(top, #0267ca 0%, #072fa0 100%);
      background: -o-linear-gradient(top, #0267ca 0%, #072fa0 100%);
      background: -ms-linear-gradient(top, #0267ca 0%, #072fa0 100%);
      background: linear-gradient(to bottom, #0267ca 0%, #072fa0 100%);
      display: inline-block;
      border-radius:5px;
      width:3px;
      height: 40px;
      margin-bottom:-16px;
    }
  }
  .navRight {
    min-width: 600px;
    height: 40px;
    display: inline-block;
    text-align: right;
    a {
      height: 40px;
      width: 90px;
      display: inline-block;
    }
  }
  a:hover {
    color: #f54203;
  }
  .nuxt-link-active {
    color: #ffbf50;
  }
}
.footer {
}
.content {
  min-height: 700px;
  height: auto;
  width: 1080px;
  margin: 0 auto;
}
</style>