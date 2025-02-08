// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue'; // 假设登录页面组件
import Home from '@/views/home/Home.vue'; // 假设主页页面组件
import Register from '@/views/Register.vue'; // 假设注册页面组件
import store from '@/store';
import { ElMessage } from 'element-plus';

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
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // 添加元信息，表示该路由需要登录才能访问
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    // 如果要访问需要登录的页面且用户未登录
    ElMessage.error('您没有登录权限，请返回登录页面，如果没有账号你可以选择注册账号');
    next('/login'); // 重定向到登录页面
  } else {
    next(); // 继续路由跳转
  }
});

export default router;
