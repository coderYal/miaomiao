<template>
  <div class="search_body">
		<div class="search_input">
			<div class="search_input_wrapper">
				<i class="iconfont icon-sousuo"></i>
				<!-- 给搜索框添加双向绑定 -->
				<input type="text" v-model="message">
			</div>					
		</div>
		<div class="search_result">
			<h3>电影/电视剧/综艺</h3>
			<ul>
				<!-- 遍历搜索结果 -->
				<li v-for="item in movieList" :key=" item.id ">
					<!-- 使用过滤器设置图片的宽高 -->
					<div class="img"><img :src=" item.img | setWidthHeight('128.180') "></div>
					<div class="info">
						<p><span>{{item.nm}}</span><span>{{item.sc}}</span></p>
						<p>{{item.enm}}</p>
						<p>{{item.cat}}</p>
						<p>{{item.rt}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>  
</template>

<script>
export default {
  // 给组件添加name方便调试
	name: "Search",
	data() {
		return {
			// message先设置为空
			message: "",
			// 定义搜索到的电影列表
			movieList: []
		}
	},
	methods: {
		// 防抖节流 ---> 取消请求的
		cancelRequest() {
			if (typeof this.source === "function") {
				this.source("终止请求");
			}
		}
	},

	// 使用watch监测数据的变化
	watch: {
		// 监听message双向绑定的数据的变化实现搜索
		message(newValue) {
			// 先把this保存
			var that = this;

			// 请求之前先取消请求
			this.cancelRequest();

			// 把状态管理中城市的id取出
			let cityId = this.$store.state.city.id;			

			// 发送请求,动态的从状态管理中获取到id
			this.axios.get("/api/searchList?cityId="+ cityId +"&kw=" + newValue, {
				// 设置防抖节流
				cancelToken: new this.axios.CancelToken(function(c) {
					that.source = c;
				})
			}).then((res) => {
				// 把请求结果拿出来
				let msg = res.data.msg;

				// 把请求的数据拿出来
				let movieList = res.data.data.movies.list;

				// 判断有没有请求到和有没有电影的数据
				if (msg && movieList) {
					// 如果请求成功并且有数据就把值赋值给data中的movieList电影列表
					this.movieList = movieList;
				}
			}).catch((err) => {
				if (that.axios.isCancel(err)) {
					// 请求被取消,返回的是取消的message
					console.log("Rquest canceled", err.message);
				} else {
					// handle error
					console.log(err);
				}
			})
		}
	}
}
</script>

// scoped 局部样式 不会引起冲突
<style scoped>
#content .search_body{ flex:1; overflow:auto;}
.search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
.search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
.search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
.search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
.search_body .search_result .img{ width: 60px; float:left; }
.search_body .search_result .img img{ width: 100%; }
.search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
.search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>