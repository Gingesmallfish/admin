// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    clearToken({ commit }) {
      commit('CLEAR_TOKEN');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
  },
});
