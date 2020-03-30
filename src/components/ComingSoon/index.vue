<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
      <ul>
        <li v-for="item in comingList" :key="item.id">
					<!-- @tap="handleToDetail(item.id)设置点击电影跳到详情页面 -->
          <div class="pic_show" @tap="handleToDetail(item.id)">
            <img :src=" item.img | setWidthHeight('128.180')" />
          </div>
          <div class="info_list">
						<!-- @tap="handleToDetail(item.id)设置点击电影跳到详情页面 -->
            <h2 @tap="handleToDetail(item.id)">{{ item.nm }}</h2>
            <p>
              <span class="person">{{ item.wish }}</span> 人想看
            </p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.rt }}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  // 给组件添加name方便调试
  name: "ComingSoon",
  data() {
    return {
      // 即将上映数据列表
      comingList: [],
      // 判断数据是否加载完成,请求时空白控制显示的动画
      isLoading: true,
      // 用来控制只有选择城市才重新请求数据的
      paerCityId: -1
    };
  },
  // activated生命周期是keep-alive缓存组件才调用的
  activated() {
    // 把状态管理中城市的id取出
    let cityId = this.$store.state.city.id;

    // 判断当前城市的id等不等于设置的paerCityId,如果等于,就不执行下面的请求
    if (this.paerCityId === cityId) {
      return;
    }
    this.isLoading = true;

    this.axios.get("/api/movieComingList?cityId=" + cityId).then(res => {
      // 判断数据是否请求过来
      let msg = res.data.msg;
      // 如果msg等于ok说明数据请求成功,就把数据给data中的comingList
      if (msg === "ok") {
        let comingList = res.data.data.comingList;
        this.comingList = comingList;
        this.paerCityId = cityId;
        this.isLoading = false;
      }
    });
	},
	
	methods: {
		handleToDetail(movieId) {
			// 跳转到电影详情页面
			this.$router.push("/movie/detail/2/" + movieId);
		} 
	}
};
</script>

// scoped 局部样式 不会引起冲突
<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.person {
  color: #faaf00;
  font-size: 15px;
  font-weight: 600;
}
</style>