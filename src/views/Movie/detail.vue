<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影片详情">
      <!-- 给小按钮返回的添加点击事件,点击返回上一层 -->
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading" />
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src=" detailMovie.img | setWidthHeight('148.208') " alt />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMovie.nm }}</h2>
            <p>{{ detailMovie.enm }}</p>
            <p>{{ detailMovie.scoreLabel }}</p>
            <p>{{ detailMovie.cat }}</p>
            <p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
            <p>{{ detailMovie.pubDesc }}</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>{{ detailMovie.dra }}</p>
      </div>
      <div class="detail_player swiper-container" ref="detail_player">
        <ul class="swiper-wrapper">
          <li v-for="(item, index) in detailMovie.photos" :key="index" class="swiper-slide">
            <div>
              <img :src=" item | setWidthHeight('140.127') " alt />
            </div>  
          </li>
        </ul>
      </div> 
    </div>
  </div>
</template>

<script>
// 引入头部组件
import Header from "@/components/Header";

export default {
  // 设置name便于调试
  name: "Detail",
  data() {
    return {
      detailMovie: {},
      // isLoading用户加载显示空白的动画
      isLoading: true
    };
  },
  // 注册组件
  components: {
    Header
  },
  // 接收movieId
  props: ["movieId"],
  methods: {
    handleToBack() {
      // 返回前一个页面
      this.$router.back();
    }
  },
  mounted() {
    // 接收传过来的id,发起请求
    this.axios.get("/api/detailmovie?movieId=" + this.movieId).then(res => {
      var msg = res.data.msg;

      // 判断是否请求成功
      if (msg === "ok") {
        this.isLoading = false;

        // 把当前的数据赋值给data中的detailMovie
        this.detailMovie = res.data.data.detailMovie;

        // 用swiper动画,等到全部都渲染完成
        this.$nextTick(() => {
          new Swiper(this.$refs.detail_player, {
            slidesPerView: "auto",
            freeMode: true,
            freeModeSticky: true
          })
        })
      }
    });
  }
};
</script>

// scoped局部样式,不会引起冲突
<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%;
  background-color: white;
}
/* 设置电影页面跳转到电影详情页动画 */
#detailContrainer.slide-enter-active {
  animation: 0.2s slideMove;
}
/* 设置电影页面跳转到电影详情页动画 */
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: url(/images/movie_1.jpg) 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
</style>