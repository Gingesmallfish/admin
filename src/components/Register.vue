<template>
  <div class="register-container">
    <div class="register-header">
      <h1>教务管理系统注册</h1>
    </div>
    <el-form :model="registerForm" ref="formRef" label-width="80px" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入用户名">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" placeholder="请输入密码">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码">
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="registerForm.role" placeholder="请选择角色">
          <el-option label="学生" value="student"></el-option>
          <el-option label="教师" value="teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
          <template #prefix>
            <el-icon>
              <Verification /></el-icon>
          </template>
        </el-input>
        <img :src="captchaUrl" @click="refreshCaptcha" alt="验证码" class="captcha-img">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister" class="register-button">注册</el-button>
      </el-form-item>
      <el-form-item>
        <el-link @click="goToLogin">已有账号？去登录</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register, getCaptcha } from '../api/auth';
import { User, Lock, Verification } from '@element-plus/icons-vue';

const router = useRouter();
const formRef = ref(null);
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  captcha: ''
});

const captchaUrl = ref(getCaptcha());

const refreshCaptcha = () => {
  captchaUrl.value = getCaptcha();
};

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致');
    return;
  }
  try {
    const { data } = await register(registerForm.value);
    if (data.success) {
      alert('注册成功，请登录');
      router.push('/login');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert('注册失败，请稍后重试');
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
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

  .register-form {
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

  .register-button {
    width: 100%;
  }
}
</style>
