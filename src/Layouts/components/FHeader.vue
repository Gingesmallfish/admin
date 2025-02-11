<template>
  <el-header class="header">
    <div class="logo">教务管理系统</div>
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="40" :src="avatarUrl" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人资料</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref } from 'vue';
import { logoutApi } from '@/api/auth.js';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const avatarUrl = ref('https://example.com/avatar.jpg'); // 替换为实际的头像URL
const store = useStore();
const router = useRouter();

const handleCommand = (command) => {
  if (command === 'profile') {
    // 处理个人资料逻辑
    console.log('查看个人资料');
  } else if (command === 'logout') {
    handleLogout();
  }
};

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
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  width: 100%; // 确保占据整个宽度

  .logo {
    font-size: 20px;
    font-weight: bold;
  }

  .user-info {
    .el-dropdown-link {
      cursor: pointer;
      color: white;
    }
  }
}
</style>
