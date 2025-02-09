<template>
  <div class="Particles">
    <Particles />
  </div>
  <div class="center">
    <div class="register-container">
      <div class="register-header">
        <h1>教务管理系统注册</h1>
      </div>
      <RegisterForm :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha" @go-to-login="goToLogin" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { getCaptcha } from '@/api/auth';
import { ElMessage } from 'element-plus';
import Particles from "@/components/Particles.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import router from "@/router";

const captchaUrl = ref('');

const refreshCaptcha = async () => {
  try {
    const response = await getCaptcha();
    const base64Image = arrayBufferToBase64(response.data);
    captchaUrl.value = `data:image/svg+xml;base64,${base64Image}`;
  } catch (error) {
    console.error('获取验证码失败:', error);
    ElMessage.error('获取验证码失败，请稍后重试');
  }
};

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

onMounted(() => {
  refreshCaptcha();
});

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
.Particles {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
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

  .register-container {
    width: 400px;
    margin: 100px auto;
    padding: 30px;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .register-header {
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
