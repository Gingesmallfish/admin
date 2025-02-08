// store/index.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    token: null,
    user: null
  },
  mutations: {
    login(state, { token, user }) {
      state.token = token;
      state.user = user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('login', { token, user });
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    }
  },
  // 持久化存储
  plugins: [
      createPersistedState({
        // 指定要持久化的 state 字段
        paths: ['token', 'user']
      })
  ]
});

export default store;
