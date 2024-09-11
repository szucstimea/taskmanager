import { createRouter, createWebHistory } from "vue-router";
import Tasklists from "../views/Tasklists.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import TasklistView from "../views/TasklistView.vue"
import UserLayout from "../components/UserLayout.vue";
import HomeLayout from "../components/HomeLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/home",
    component: HomeLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
      },

      {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
          {
            path: "/login",
            name: "Login",
            component: Login,
          },
          {
            path: "/register",
            name: "Register",
            component: Register,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    redirect: "/tasklists",
    component: UserLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/tasklists",
        name: "Tasklists",
        component: Tasklists,
      },
      {
        path: "/tasklists/create",
        name: "TasklistCreate",
        component: TasklistView,
      },
      {
        path: "/tasklists/:id",
        name: "TasklistView",
        component: TasklistView,
      },
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
