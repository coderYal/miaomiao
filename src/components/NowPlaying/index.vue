<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDownMsg">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <!-- @tap="handleToDateil"图片添加点击事件,并把当前影片的id传过去 -->
          <div @tap="handleToDateil(item.id)" class="pic_show">
            <img :src=" item.img | setWidthHeight('128.180')" />
          </div>
          <div class="info_list">
						<!-- @tap="handleToDateil"图片添加点击事件,并把当前影片的id传过去 -->
            <h2 @tap="handleToDateil(item.id)">{{item.nm}}</h2>
            <img v-if="item.version" src="@/assets/maxs.png" alt />
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>今天55家影院放映607场</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  // 添加name方便调试
  name: "NowPlaying",
  data() {
    return {
      // 正在热映列表
      movieList: [],
      // 定义加载显示的数据
      pullDownMsg: "",
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

    // 请求数据动态的请求
    this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
      // 判断有无拿到数据
      let msg = res.data.msg;
      // 如果msg等于ok就把数据赋值给data中的movieList
      if (msg === "ok") {
        // 赋值数据
        let movieList = res.data.data.movieList;
        this.movieList = movieList;
        // 数据加载完成设置为false
        this.isLoading = false;
        // 把当前状态管理的id赋值给data中的paerCityId
        this.paerCityId = cityId;
      }
    });
  },
  methods: {
    // handleToDateil点击跳转详情页
    handleToDateil(movieId) {
			// 跳转路由到详情页
			this.$router.push("/movie/detail/1/" + movieId);
    },

    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },

    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?cityId=18").then(res => {
          let msg = res.data.msg;
          if (msg === "ok") {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 500);
          }
        });
      }
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
.movie_body .pullDownMsg {
  padding: 0;
  margin: 0;
}
</style>