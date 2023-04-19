import { createStore, Store } from "vuex";

export default createStore({
  state: {
    loginUserInfo: null, //用户信息
    showLogin: false, //是否展示登录信息
    //板块信息
    boardList: [],
    //当前一级板块
    activePBoardId: 0,
    //当前二级板块
    activeBoardId: 0,
  },

  //相当于计算属性
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
    getActivePBoardId: (state) => {
      return state.activePBoardId;
    },
    getActiveBoardId: (state) => {
      return state.activeBoardId;
    },
  },

  //唯一可以修改state里面的属性值 的方法
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
    setActivePBoardId: (state, value) => {
      state.activePBoardId = value;
    },
    setActiveBoardId: (state, value) => {
      state.activeBoardId = value;
    },
  },

  //可以进行异步操作
  actions: {},
  modules: {},
});
