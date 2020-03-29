// 配置反向代理,防止跨域
module.exports = {
  // devServer表示开发环境的配置
  devServer: {
    // proxy反向代理字段
    proxy: {
      // api所有的请求在api后面是不一样的所以用api
      "api": {
        // target反向代理的目标
        target: "http://39.97.33.178",
        // changeOrigin反向代理是否要改变地址
        changeOrigin: true
      }
    }
  }
}