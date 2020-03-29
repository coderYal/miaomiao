import Vue from 'vue'
import Vuex from 'vuex'

// 引入城市列表状态管理
import city from "./city";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  // modules引入子状态管理
  modules: {
    city
  }
})
