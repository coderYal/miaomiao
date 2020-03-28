<template>
	<footer id="footer">
		<ul>
      <!-- router-link路由跳转 tag是要渲染的标签 to是跳转到指定路由的路径 -->
			<router-link tag="li" to="/movie">
				<i class="iconfont icon-dianying"></i>
				<p>电影</p>
			</router-link>
			<router-link tag="li" to="/cinema">
				<i class="iconfont icon-yingyuan"></i>
				<p>影院</p>
			</router-link>
			<router-link tag="li" to="mine">
				<i class="iconfont icon-wode"></i>
				<p>我的</p>
			</router-link>
		</ul>
	</footer>  
</template>

<script>
export default {

}
</script>

// scoped ---> 代表是局部的,不会引起冲突
<style scoped>
#footer{ width:100%; height:50px; background: white; border-top:2px #ebe8e3 solid; position: fixed; left: 0; bottom:0;}
#footer ul{ display: flex; text-align: center; height:50px; align-items:center;}
#footer ul li{ flex:1; height:40px;}
#footer ul li.active{ color: #f03d37;}
/* 使用vue自带的点击设置选中样式 */
#footer ul li.router-link-active{color: #f03d37;}
#footer ul i{ font-size: 20px;}
#footer ul p{ font-size: 12px; line-height: 18px;}
</style>