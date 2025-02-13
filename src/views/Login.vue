<template>
  <div class="center flex justify-center items-center min-h-screen cursor-pointer" v-loading.fullscreen.lock="loading">
    <div class="login-container w-96 mx-auto p-7 border border-gray-300 rounded-lg shadow-md bg-white">
      <div class="login-header text-center mb-7">
        <h1 class="text-gray-800 text-2xl">{{ props.title }}</h1>
      </div>
      <!-- 传递事件给子组件 -->
      <LoginForm
        :captchaUrl="captchaUrl"
        @submit="handleSubmit"
        @refresh-captcha="refreshCaptcha"
        @go-To-Register="gotoRegister"
        title="登录"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import store from '@/store';
import LoginForm from "@/components/Auth/LoginForm.vue";
import { useCaptcha } from '@/utils/Captcha.js';
import { login } from "@/api/auth";

const { captchaUrl, refreshCaptcha } = useCaptcha(); // 使用验证码逻辑

const router = useRouter();

// 接收标题 prop
const props = defineProps({
  title: {
    type: String,
    default: '教务管理系统登录'
  }
})

const loading = ref(false);

// 使用 .then() 和 .catch() 处理登录逻辑
const handleSubmit = (loginData) => {
  loading.value = true;
  login(loginData)
    .then((res) => {
      const { data } = res;
      if (data.message === '登录成功') {
        const { token, user } = data;
        store.dispatch('login', { token, user });
        ElMessage.success('登录成功');
        router.push('/admin');
      } else {
        ElMessage.error(data.message);
        refreshCaptcha(); // 登录失败，刷新验证码
      }
    })
    .catch((error) => {
      console.error('登录失败:', error);
      ElMessage.error('登录失败，请稍后重试！');
    })
    .finally(() => {
      loading.value = false;
    });
};

// 跳转到注册页面
const gotoRegister = () => {
  router.push('/register');
};

onMounted(() => {
  refreshCaptcha();  // 初始化时获取验证码
});
</script>

<style scoped lang="scss">
.Particles {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -9;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
