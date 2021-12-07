const boardModule = {
  state: {
    boards: [],
  },
  mutations: {
    fetchBoards(state, boards) {
      state.boards = boards;
    },
    createBoard(state, board) {
      state.boards.push(board);
    },
  },
  actions: {
    fetchBoards({ commit }, boards) {
      commit("fetchBoards", boards);
    },
    createBoard({ commit }, board) {
      commit("createBoard", board);
    },
  },
  getters: {
    getBoards(state) {
      return state.boards;
    },
  },
};

export default boardModule;
