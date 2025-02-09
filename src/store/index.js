import {createStore} from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    token: null,
    user: null,
    redirectPath: null // 添加重定向路径
  },
  mutations: {
    login(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
    setRedirectPath(state, path) {
      state.redirectPath = path; // 设置重定向路径
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('login', { token, user });
    },
    logout({ commit }) {
      commit('logout');
    },
    setRedirectPath({ commit }, path) {
      commit('setRedirectPath', path);
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    getRedirectPath(state) {
      return state.redirectPath; // 获取重定向路径
    }
  },
  plugins: [
    createPersistedState({
      paths: ['token', 'user'],
      storage: window.localStorage
    })
  ]
});

export default store;
