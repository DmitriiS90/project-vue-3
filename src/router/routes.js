import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import Project from "../components/Project.vue";
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
    path: "/projects",
    name: "Projects",
    component: Projects,
    meta: {
      layout: true,
    },
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
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
