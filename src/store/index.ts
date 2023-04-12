import { createStore, Store } from "vuex";

export default createStore({
  state: {
    loginUserInfo: null, //用户信息
    showLogin: false, //是否展示登录信息
  },
  getters: {
    getLoginUserInfo: (state) => {
      return state.loginUserInfo;
    },
  },
  mutations: {
    updateLoginUserInfo(state, value) {
      state.loginUserInfo = value;
    },
    changeShowLogin(state, value) {
      state.showLogin = value;
    },
  },
  actions: {},
  modules: {},
});
