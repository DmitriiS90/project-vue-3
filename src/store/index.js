import { createStore } from "vuex";
import auth from "./authModule";
import project from "./projectModule";
import board from "./boardModule";

export default createStore({
  modules: {
    auth,
    project,
    board,
  },
});
