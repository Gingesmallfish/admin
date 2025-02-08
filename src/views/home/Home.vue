<template>
  <div>
    <h1>Home Page</h1>
    <el-button @click="handleLogout">退出</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { logoutApi } from '@/api/auth';
import store from '@/store';

const router = useRouter();

const handleLogout = async () => {
  try {
    // 调用后端退出接口
    await logoutApi();
    // 删除 localStorage 中的 token
    localStorage.removeItem('token');
    // 删除 sessionStorage 中的验证码
    sessionStorage.removeItem('captcha');
    // 清空 store 中的用户信息
    store.dispatch('logout');
    ElMessage.success('退出成功');
    router.push('/login');
  } catch (error) {
    console.error('退出失败:', error);
    ElMessage.error('退出失败，请稍后重试');
  }
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
