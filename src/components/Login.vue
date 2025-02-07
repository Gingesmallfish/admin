<template>
  <div class="login-container">
    <div class="login-header">
      <h1>教务管理系统登录</h1>
    </div>
    <el-form :model="loginForm" ref="formRef" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="loginForm.captcha" placeholder="请输入验证码">
          <template #prefix>
            <el-icon><Verification /></el-icon>
          </template>
        </el-input>
        <img :src="captchaUrl" @click="refreshCaptcha" alt="验证码" class="captcha-img">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-link @click="goToRegister">没有账号？去注册</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { login, getCaptcha } from '@/api/auth';
import { User, Lock, Verification } from '@element-plus/icons-vue';

const router = useRouter();
const store = useStore();
const formRef = ref(null);
const loginForm = ref({
  username: '',
  password: '',
  captcha: ''
});

const captchaUrl = ref(getCaptcha());

const refreshCaptcha = () => {
  captchaUrl.value = getCaptcha();
};

const handleLogin = async () => {
  const success = await store.dispatch('login', loginForm.value);
  if (success) {
    alert('登录成功');
    // 这里可以添加跳转到主页的逻辑
  } else {
    alert('登录失败，请检查用户名、密码或验证码');
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped lang="scss">
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

  .login-form {
    .el-form-item {
      margin-bottom: 20px;
    }
    .captcha-img {
      height: 40px;
      margin-left: 10px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .login-button {
    width: 100%;
  }
}
</style>
