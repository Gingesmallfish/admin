import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Admin from '@/Layouts/admin.vue';
import Register from '@/views/Register.vue';
import NotFound from '@/NotFound/404.vue';
import store from '@/store';
import { ElMessage } from 'element-plus';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAuth: true } // 添加元信息，表示该路由需要登录才能访问
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*', // 捕获所有未定义的路径
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    // 如果目标路由需要登录，但用户未登录
    ElMessage.error('您还没有权限，请登录后访问'); // 弹出提示信息
    next('/login'); // 重定向到登录页面
  } else if (store.getters.isLoggedIn && to.path === '/login') {
    // 如果用户已登录，但尝试访问登录页面，则重定向到主页
    next('/admin');
  } else {
    next(); // 其他情况正常跳转
  }
});

export default router;
