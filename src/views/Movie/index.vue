<template>
  <div id="main">
    <!-- 给父组件的自定义属性传入标题 -->
    <Header title="喵喵电影" />
    <!-- 电影中的二级导航 -->
      <div id="content">
        <div class="movie_menu">
          <!-- <router-link>点击跳转二级路由对应的页面 -->
          <router-link tag="div" to="/movie/city" class="city_name">
          <!-- 状态管理 -->
            <span>{{$store.state.city.name}}</span><i class="iconfont icon-lower-triangle"></i>
          </router-link>
          <div class="hot_swtich">
            <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
            <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
          </div>
          <router-link tag="div" to="/movie/search" class="search_entry">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
        </div>
        <!-- 二级路由渲染 -->
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    <TabBar />
    <!-- 用命名视图同级显示详情页 -->
    <router-view name="detail" />
  </div>
</template>

<script>
// 引入头部组件和底部组件
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

// 引入弹窗
import { messageBox } from "@/components/JS";

export default {
  // 给组件添加name方便调试
  name: "Movie",
  // 注册组件使用
  components: {
    Header,
    TabBar
  },

  mounted() {
    setTimeout(() => {
      // 获取定位的请求
      this.axios.get("/api/getLocation").then((res) => {
        var msg = res.data.msg;
        if (msg === "ok") {
          let name = res.data.data.nm;
          let id = res.data.data.id;

          // 当城市的id等于状态管理的id 就不弹框
          if (this.$store.state.city.id == id) { return; }

          messageBox({
            title: "定位",
            content: name,
            cancel: "取消",
            ok: "切换定位",

            // 配置切换定位
            handleOk() {
              window.localStorage.setItem("nowName", name);
              window.localStorage.setItem("nowId", id);
              window.location.reload();
            }
          })
        }
      })
    }, 1000)
  }

}
</script>

// scoped ---> 代表是局部的,不会引起冲突
<style scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
/* 设置vue自带的点击高亮 */
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
/* 设置vue自带的点击高亮 */
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
/* 设置vue自带的点击高亮 */
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>