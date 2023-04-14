import { createStore, Store } from "vuex";

export default createStore({
  state: {
    loginUserInfo: null, //用户信息
    showLogin: false, //是否展示登录信息
    //板块信息
    boardList: [],
  },
  getters: {
    getLoginUserInfo: (state) => {
      return state.loginUserInfo;
    },
    getBoardList: (state) => {
      return state.boardList;
    },
    getSubBoardList: (state) => (boardId: any) => {
      let board: any = state.boardList.find((item: any) => {
        return item.boardId == boardId;
      });
      return board ? board.children : [];
    },
  },
  mutations: {
    updateLoginUserInfo(state, value) {
      state.loginUserInfo = value;
    },
    changeShowLogin(state, value) {
      state.showLogin = value;
    },
    saveBoardList(state, value) {
      state.boardList = value;
    },
  },
  actions: {},
  modules: {},
});
