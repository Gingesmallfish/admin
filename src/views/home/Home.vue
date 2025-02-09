<template>
  <div>
    <h1>Home Page</h1>
    <el-button @click="handleLogout">退出</el-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { logoutApi } from '@/api/auth';
import store from '@/store';

const router = useRouter();

// 退出登录
const handleLogout = async () => {
  try {
    // 调用后端退出接口
    await logoutApi();
    // 清空 store 中的用户信息
    store.dispatch('logout');
    ElMessage.success('退出成功');
    router.push('/login');
  } catch (error) {
    console.error('退出失败:', error);
    ElMessage.error('退出失败，请稍后重试');
  }
};

// 页面加载时检查登录状态
onMounted(() => {
  if (!store.getters.isLoggedIn) {
    ElMessageBox.confirm('您尚未登录，是否去登录？', '提示', {
      confirmButtonText: '登录',
      cancelButtonText: '注册',
      type: 'info'
    }).then(() => {
      // 用户选择登录
      router.push('/login');
    }).catch(() => {
      // 用户选择注册
      router.push('/register');
    });
  }
});
</script>

<style scoped lang="scss">
</style>
