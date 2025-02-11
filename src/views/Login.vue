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
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
import store from '@/store';
import LoginForm from "@/components/Auth/LoginForm.vue";
import {useCaptcha} from '@/utils/Captcha.js';
import {login} from "@/api/auth";
const {captchaUrl, refreshCaptcha} = useCaptcha(); // 使用验证码逻辑

const router = useRouter();


const props = defineProps({
  //标题
  title: {
    type: String,
    default: '教务管理系统登录'
  }
})

// 使用 .then() 和 .catch() 处理登录逻辑
const handleSubmit = (loginData) => {
  login(loginData)
      .then((res) => {
        const {data} = res;
        if (data.message === '登录成功') {
          const {token, user} = data;
          store.dispatch('login', {token, user});
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
      });
};

onMounted(() => {
  refreshCaptcha(); // 初始化时获取验证码
});


refreshCaptcha()

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
