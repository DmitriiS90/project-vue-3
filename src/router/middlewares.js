import $store from "../store";

export function checkAccessMiddleware(to, from, next) {
  const publicRoutes = ["/login", "/singup"];

  const isProtectedRoute = !publicRoutes.includes(to.path);
  const isAuth = $store.getters.isAuth;

  if (isProtectedRoute && !isAuth) {
    next("/login");
  } else {
    next();
  }

  // const user = $store.getters.getUser;
  // if (to.name !== "SignUp" && !user && !isAuth) {
  //   next({ name: "SignUp" });
  // } else if (to.name !== "Login" && user && !isAuth) {
  //   next({ name: "Login" });
  // } else {
  //   next();
  // }
}
