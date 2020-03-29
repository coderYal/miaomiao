<template>
  <div class="city_body">
		<div class="city_list">
			<div class="city_hot">
				<h2>热门城市</h2>
				<!-- for渲染热门城市数据 -->
				<ul class="clearfix">
					<li v-for="item in hotCity" :key="item.id">{{ item.name }}</li>
				</ul>
			</div>
			<!-- ref在普通的dom元素上使用,引用指向的就是DOM元素 -->
			<div class="city_sort" ref="city_sort">
				<!-- 渲染城市列表数据 -->
        <div v-for="item in cityList" :key="item.index">
					<h2>{{ item.index }}</h2>
					<ul>
						<li v-for="itemList in item.list" :key="itemList.id">{{ itemList.name }}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 渲染右边A-Z的数据 -->
		<div class="city_index">
			<ul>
				<!-- 给每个字母添加移动端触摸事件(@touchstart),并且把当前的索引值传进去 -->
				<li v-for="(item, index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{ item.index }}</li>
			</ul>
		</div>
	</div> 
</template>

<script>
export default {
  // 给组件添加name方便调试
	name: "City",
	data() {
		return {
			// 把改造后的城市数据放入
			cityList: [],

			// 把热门城市放入
			hotCity: []
		}
	},
	// mounted生命周期获取数据,在渲染完之后获取
	mounted() {
		// 请求城市数据
		this.axios.get("/api/cityList").then((res) => {
			// 先判断数据是否请求过来
			var msg = res.data.msg;

			// 如果msg等于ok即是请求成功
			if (msg === "ok") {
				var allCity = res.data.data.cities;
				// 如果请求的有这个数据,就调用改造城市列表数据
				this.formatCityList(allCity);
			}

		});
	},
	methods: {
		// 改造城市列表数据为 {index: "A", list: [{nm: "阿拉善", id: 888}]}
		formatCityList(allCity) {
			// 先定义一个空数组,存储遍历的A-Z的字母
			let cityList = [];

			// 定义数组,存储热门城市
			let hotCity = [];

			// 遍历A-Z的字母 65代表的是A 91代表的是Z
			for (let i = 65; i < 91; i++) {
				// 索引对应的是A-Z之间的字母
				let obj = {"index": String.fromCharCode(i), "list": [] };

				// 把每个对象push到数组中
				cityList.push(obj);
			}

			// 使用map数组方法
			allCity.map(x => {
				// 取得每个城市列表数据中的第一个字母并转为大写,然后把字母转为数字,在减去65如果字母A转为数字就是65 65-65 等于0得到对应A-Z的索引
				let firstLetter = x.py.substr(0, 1).toUpperCase().charCodeAt() - 65;

				// 把得到的对应的索引把里面的城市名字及id加入到对应的索引中
				cityList[firstLetter]["list"].push({name: x.nm, id: x.id});

				// 判断热门城市如果等于1的就是热门城市
				if (x.isHot === 1) {
					// 把热门城市push到定义的HotCity的数组中
					hotCity.push({"name": x.nm, "id": x.id});
				}
			});

			// 把当前改造后的城市数据给data中的result
			this.cityList = cityList;

			// 把当前热门城市数据给data中的HotCity
			this.hotCity = hotCity;
		},

		// 设置点击A-Z跳转到对应的城市
		handleToIndex(index) {
			// 先把城市里边A-Z的所有h2元素获取
			let h2 = this.$refs.city_sort.getElementsByTagName("h2");

			// 城市列表和右边点击跳转的A-Z的索引是一致的,点击右边的A-Z的索引对应着城市列表A-Z的索引,所以获取到城市列表的offsetTop(元素距离页面顶部)的值然后赋值给城里列表的父元素向上卷曲出去的距离
			this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
		}
	}
}
</script>

// scoped 局部样式 不会引起冲突
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>