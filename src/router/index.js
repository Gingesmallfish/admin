import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import { ElMessage } from 'element-plus';

const defaultRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录页' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/Layouts/admin.vue'),
    meta: { requiresAuth: true, title: '管理后台' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册页' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/NotFound/404.vue'),
    meta: { title: '404 页面' }
  },
];





// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: defaultRoutes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    ElMessage.error('您还没有权限，请登录后访问');
    next('/login');
  } else if (store.getters.isLoggedIn && to.path === '/login') {
    next('/admin');
  } else {
    next();
  }
});

export default router;
