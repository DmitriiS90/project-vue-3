import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    isAuth: true,
  },
  mutations: {
    signUpUser(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    signUpUser({ commit }, user) {
      commit("signUpUser", user);
    },
  },
  getters: {
    getUser(state) {
      return state.users[0];
    },
    getAuth(state) {
      return state.isAuth;
    },
  },
});
