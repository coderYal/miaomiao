// 路由懒加载导出
export default {
  path: "/movie",
  component: () => import("@/views/Movie"),
  // 配置二级路由
  children: [
    {
      path: "city",
      component: () => import("@/components/City")
    },
    {
      path: "nowPlaying",
      component: () => import("@/components/NowPlaying")
    },
    {
      path: "comingSoon",
      component: () => import("@/components/ComingSoon")
    },
    {
      path: "search",
      component: () => import("@/components/Search")
    },
    // 设置二级路由重定向,当路由等于/movie重定向到/movie/nowPlaying
    {
      path: "/movie",
      redirect: "/movie/nowPlaying"
    }
  ]
}