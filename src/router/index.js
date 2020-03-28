import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入影院我的热映三个懒加载路由
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'


Vue.use(VueRouter)

const routes = [
  movieRouter,
  mineRouter,
  cinemaRouter,
  // 设置路由重定向,如果以上路由都不匹配,重定向到movie路由
  {
    path: '/*',
    redirect: '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
