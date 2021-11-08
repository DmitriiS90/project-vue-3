import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Profile from "../views/Profile.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: true,
    },
  },
  // {
  //   path: "/sugnup",
  //   name: "SingUp",
  //   component: SingUp,
  // },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: false,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      layout: true,
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = () => {
    return this.$store.getters.getAuth;
  };

  if (to.name !== "Login" && !auth) next({ name: "Login" });
  else next();
});

export default router;
