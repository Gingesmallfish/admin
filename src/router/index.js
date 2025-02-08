import {createRouter, createWebHashHistory} from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/home/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,

    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 全局路由守卫, 拦截未登录用户
// 全局前置守卫，用于检查路由是否需要登录
// router.beforeEach((to, from, next) => {
//     const isLoggedIn = localStorage.getItem('token') ? true : false; // 简单示例，通过localStorage判断是否登录
//     if (to.meta.requiresAuth && !isLoggedIn) {
//         next('/login'); // 如果需要登录但未登录，重定向到登录页面
//     } else {
//         next();
//     }
// });

export default router;
