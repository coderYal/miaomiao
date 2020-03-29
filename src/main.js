import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入axios
import axios from "axios";

// 把axios加入到原型中
Vue.prototype.axios = axios;

// 添加全局过滤器,给图片过滤宽高,url的实参不用传入,哪个当前的过滤器,哪个就是url,只需传入wh(宽高)
Vue.filter("setWidthHeight", (url, wh) => {
  return url.replace(/w\.h/, wh);
});

// 把scroll加入全局组件中
import Scroller from "@/components/Scroller";
// 注册全局组件
Vue.component("Scroller", Scroller);

// 把loading加入全局组件中
import Loading from "@/components/Loading";
// 注册全局组件
Vue.component("Loading", Loading);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
