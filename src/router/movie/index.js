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
    // 配置命名视图,让同级显示
    {
      // 动态路由
      path: "detail/1/:movieId",
      components: {
        // 设置default的路由也显示正在热映
        default: () => import("@/components/NowPlaying"),
        detail: () => import("@/views/Movie/detail")
      },
      // 动态的获取传过来的id
      props: {
        detail: true
      }
    },
    // 配置命名视图,让同级显示
    {
      // 动态路由
      path: "detail/2/:movieId",
      components: {
        // 设置default的路由也显示,显示即将上映
        default: () => import("@/components/ComingSoon"),
        detail: () => import("@/views/Movie/detail")
      },
      // 动态的获取传过来的id
      props: {
        detail: true
      }
    },
    // 设置二级路由重定向,当路由等于/movie重定向到/movie/nowPlaying
    {
      path: "/movie",
      redirect: "/movie/nowPlaying"
    }
  ]
}