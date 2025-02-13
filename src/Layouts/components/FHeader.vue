<template>
  <header class="bg-indigo-500 text-white flex justify-between items-center w-full p-2">
<!--    <div class="w-60 flex justify-center items-center text-2xl font-bold">教务管理系统</div>-->
    <div class="flex gap-2">
      <el-dropdown @command="handleCommand">
        <span class="cursor-pointer">
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
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { logoutApi } from '@/api/user'; // 假设这是你用来获取头像的 API 函数

const avatarUrl = ref(''); // 初始头像
const store = useStore();
const router = useRouter();

// 获取头像
// 假设你有一个获取头像的 API 函数
// avatarUrl.value = await getAvatarApi();

// 退出逻辑
const handleCommand = (command) => {
  if (command === 'profile') {
    console.log('查看个人资料');
  } else if (command === 'logout') {
    handleLogout();
  }
};

const handleLogout = () => {
  logoutApi()
    .then(() => {
      return store.dispatch('logout'); // 清空用户信息
    })
    .then(() => {
      ElMessage.success('退出成功');
      router.push('/login');
    })
    .catch((error) => {
      console.error('退出失败:', error);
      ElMessage.error('退出失败，请稍后重试');
    });
};
</script>

<style scoped lang="scss">

header {
  @apply bg-indigo-500 text-white flex justify-between items-center w-full p-2;
}

.w-60 {
  @apply w-60 flex justify-center items-center text-2xl font-bold;
}

.flex {
  @apply flex gap-2;
}

.cursor-pointer {
  @apply cursor-pointer;
}
</style>
