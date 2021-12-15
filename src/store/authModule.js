const authModule = {
  state: {
    user: null,
    isAuth: true,
  },
  mutations: {
    signUp(state, user) {
      state.user = user;
    },
    setAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
  },
  actions: {
    signUp({ commit }, user) {
      commit("signUp", user);
    },
    setAuth({ commit }, isAuth) {
      commit("setAuth", isAuth);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isAuth(state) {
      return state.isAuth;
    },
  },
};

export default authModule;
