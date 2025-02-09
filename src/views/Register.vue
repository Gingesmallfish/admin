<template>
  <div class="Particles">
    <Particles />
  </div>
  <div class="center">
    <div class="register-container">
      <div class="register-header">
        <h1>{{ props.title }}</h1>
      </div>
      <RegisterForm :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha" @go-to-login="goToLogin" />
    </div>
  </div>
</template>

<script setup>

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Particles from "@/components/Particles.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";
import { useCaptcha } from '@/utils/Captcha.js'; // 导入验证码逻辑

const { captchaUrl, refreshCaptcha } = useCaptcha(); // 使用验证码逻辑

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: '教务管理系统注册'
  }
});


onMounted(() => {
  refreshCaptcha(); // 初始化时获取验证码
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
