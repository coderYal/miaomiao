// 路由懒加载导出
export default {
  path: "/cinema",
  component: () => import("@/views/Cinema")
}