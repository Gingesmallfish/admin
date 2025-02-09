<template>
  <div class="Particles">
    <Particles />
  </div>
  <div class="center">
    <div class="login-container">
      <div class="login-header">
        <h1>{{ props.title }}</h1>
      </div>
      <LoginForm :captchaUrl="captchaUrl" @submit="handleSubmit" @refresh-captcha="refreshCaptcha" @go-to-register="gotoRegister"/>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, getCaptcha } from '@/api/auth';
import { ElMessage } from 'element-plus';
import store from '@/store';
import Particles from '@/components/Particles.vue';
import LoginForm from '@/components/Auth/LoginForm.vue';
const router = useRouter();
const captchaUrl = ref('');


const props = defineProps({
  //标题
  title: {
    type: String,
    default: '教务管理系统登录'
  }
})


// 切换验证码
const refreshCaptcha = async () => {
  try {
    const response = await getCaptcha();
    const base64Image = arrayBufferToBase64(response.data);
    captchaUrl.value = `data:image/svg+xml;base64,${base64Image}`;
  } catch (error) {
    console.error('获取验证码失败', error);
    ElMessage.error('获取验证码失败，请稍后重试');
  }
};

// 将 ArrayBuffer 转换为 Base64 字符串
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// 初始化时获取验证码
onMounted(() => {
  refreshCaptcha();
});

refreshCaptcha()


// 提交登录
const handleSubmit = async (loginData) => {
  try {
    const { data } = await login(loginData);
    if (data.message === '登录成功') {
      const { token, user } = data;
      await store.dispatch('login', { token, user });
      ElMessage.success('登录成功');

      const redirectPath = store.getters.getRedirectPath;
      if (redirectPath) {
        await router.push(redirectPath);
        store.dispatch('setRedirectPath', null); // 清空重定向路径
      } else {
        await router.push('/home');
      }
    } else {
      ElMessage.error(data.message);
    }
  } catch (error) {
    console.error('登录失败:', error);
    ElMessage.error('登录失败，请稍后重试！');
  }
};


const gotoRegister = () => {
  router.push('/register');
}

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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  cursor: pointer;

  .login-container {
    width: 400px;
    margin: 100px auto;
    padding: 30px;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .login-header {
      text-align: center;
      margin-bottom: 30px;

      h1 {
        color: #303133;
        font-size: 24px;
      }
    }
  }
}
</style>
