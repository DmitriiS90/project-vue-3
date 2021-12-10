import Home from "../views/Home.vue";
import Boards from "../views/Boards.vue";
import Board from "../components/Board.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: true,
    },
  },
  {
    path: "/boards",
    name: "Boards",
    component: Boards,
    meta: {
      layout: true,
    },
  },
  {
    path: "/boards/:id",
    name: "Board",
    component: Board,
    meta: {
      layout: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      layout: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      layout: true,
    },
  },
];

export { routes };
