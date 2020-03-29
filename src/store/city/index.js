const state = {
  // 初始的城市及id,如果有本地存储,就把本地存储取出来,如果没有默认北京
  name: window.localStorage.getItem("nowName") || "北京",
  id: window.localStorage.getItem("nowId") || 1
};

const actions = {

};

const mutations = {
  // 状态的方法,状态管理方法名要大写
  CITY_INFO(state, payload) {
    state.name = payload.name;
    state.id = payload.id;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}