import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        token: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {
        async login({ commit }, formData) {
            try {
                const { data } = await login(formData);
                if (data.success) {
                    commit('setUser', { username: formData.username });
                    commit('setToken', data.token);
                    return true;
                }
                return false;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
});

export default store;
