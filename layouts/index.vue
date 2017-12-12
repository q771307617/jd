<template>
    <div id="main" class = "main">

			<div class="header">
				<p><img src="./../assets/img/frontHeader.png" alt=""></p>
				<div class="nav">
					<el-menu
						class="el-menu-demo"
						mode="horizontal"
						@select="handleSelect"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b">
						<el-menu-item index="1"><a href="/">首页</a></el-menu-item>
						<el-menu-item index="2"><a href="/dataAnalysis">数据分析</a></el-menu-item>
						<el-menu-item index="3"><a href="/enterprise">企业管理</a></el-menu-item>
					</el-menu>
				</div>
			</div>
			<nuxt class="content"/>
			<div class="footer">底部</div>
				
	</div>

</template>
<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
	.header,.footer{
		width:100%;
		min-height: 130px;
		line-height: 130px;
		text-align: center;
		background:#545c64;
	}
	.header p{height:100px;}
	.header p img{width:100%}
	.nav{width:1080px;margin: 0 auto;}
	.nav a{display: block;}
	.footer{
		
	}
	.content{min-height:700px;height:auto;width:1080px;margin: 0 auto;}
</style>