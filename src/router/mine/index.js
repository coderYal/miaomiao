// 路由懒加载导出
export default {
  path: "/mine",
  component: () => import("@/views/Mine")
}