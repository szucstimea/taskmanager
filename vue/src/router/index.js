import { createRouter, createWebHistory } from "vue-router";
import Tasklist from "../views/Tasklist.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import UserLayout from "../components/UserLayout.vue";
import HomeLayout from "../components/HomeLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: HomeLayout,
      // meta: {isGuest: true},
      children: [
          {
              path: '/home',
              name: 'Home',
              component: Home
          },

          {
              path: '/auth',
              redirect: '/login',
              name: 'Auth',
              component: AuthLayout,
              // meta: {isGuest: true},
              children: [
                  {
                      path: '/login',
                      name: 'Login',
                      component: Login
                  },
                  {
                      path: '/register',
                      name: 'Register',
                      component: Register
                  }
              ]
          }
      ]
  },
  {
      path: '/',
      redirect: '/tasklist',
      component: UserLayout,
      meta: {requiresAuth: true},
      children: [
          {
              path: '/tasklist',
              name: 'Tasklist',
              component: Tasklist
          },
      ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next)=>{
  if (to.meta.requiresAuth && !store.state.user.token){
      next({name: 'Home'})
  }else{
      next();
  }
})

export default router;
