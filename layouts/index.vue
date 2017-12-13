<template>
    <div id="main" class = "main">

			<div class="header">
				<p><img src="./../assets/img/frontHeader.png" alt=""></p>
				<div class="nav">
					<!-- <el-menu
						class="el-menu-demo"
						mode="horizontal"
						@select="handleSelect"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b">
						<el-menu-item index="1"><a href="/">首页</a></el-menu-item>
						<el-menu-item index="2"><a href="/dataAnalysis">数据分析</a></el-menu-item>
						<el-menu-item index="3"><a href="/enterprise">企业管理</a></el-menu-item>
					</el-menu> -->
					<!-- <p class="navLeft"> -->
						<el-menu
								class="el-menu-demo navLeft"
								mode="horizontal"
								@select="handleSelect"
								text-color="#fff"
								active-text-color="#ffd04b">
								<el-menu-item index="1"><a href="/">首页</a></el-menu-item>
								<el-menu-item index="2"><a href="/dataAnalysis">数据分析</a></el-menu-item>
								<el-menu-item index="3"><a href="/enterprise">企业管理</a></el-menu-item>
							</el-menu>
						<!-- </p> -->
					<p class="navRight"></p>
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

<style scoped lang="scss">
	.footer{
		width:100%;
		min-height: 130px;
		line-height: 130px;
		text-align: center;
		background:#545c64;
	}
	.header p{height:100px;}
	.header p img{width:100%}
	.nav .navLeft{width:100%;margin: -7px auto 0;

		background: -moz-linear-gradient(top, #000000 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -o-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -ms-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: linear-gradient(to bottom, #000000 0%,#ffffff 100%);
	}
	.nav a{display: block;}
	.footer{
		
	}
	.content{min-height:700px;height:auto;width:1080px;margin: 0 auto;}
</style>