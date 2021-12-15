const boardModule = {
  state: {
    boards: [],
    boardList: [],
  },
  mutations: {
    fetchBoards(state, boards) {
      state.boards = boards;
    },
    createBoard(state, board) {
      state.boards.push(board);
    },
    fetchBoardList(state, boardList) {
      state.boardList = boardList;
    },
    addBoardListItem(state, item) {
      state.boardList.push(item);
    },
  },
  actions: {
    fetchBoards({ commit }, boards) {
      commit("fetchBoards", boards);
    },
    createBoard({ commit }, board) {
      commit("createBoard", board);
    },
    fetchBoardList({ commit }, boardList) {
      commit("fetchBoardList", boardList);
    },
    addBoardListItem({ commit }, item) {
      commit("addBoardListItem", item);
    },
  },
  getters: {
    getBoards(state) {
      return state.boards;
    },
    getBoardList(state) {
      return state.boardList;
    },
  },
};

export default boardModule;
