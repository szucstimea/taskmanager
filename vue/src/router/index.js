import { createRouter, createWebHistory } from "vue-router";
import TaskList from '../views/TaskList.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'tasklist',
        component: TaskList
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router