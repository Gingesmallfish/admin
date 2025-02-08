<template>
  <div class="Particles">
    <Particles/>
  </div>
  <div class="login-container">
    <div class="login-header">
      <h1>教务管理系统登录</h1>
    </div>
    <el-form :model="loginForm" :rules="LoginRules" ref="formRef" label-width="70px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
        >
          <template #prefix>
            <el-icon>
              <User/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            @click:append="togglePasswordVisibility"
        >
          <template #prefix>
            <el-icon>
              <Lock/>
            </el-icon>
          </template>
          <template #suffix>
            <el-icon @click="togglePasswordVisibility" >
              <component :is="passwordVisible ? 'View' : 'Hide'" style="cursor: pointer"/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha" class="captcha-item">
        <el-input v-model="loginForm.captcha" placeholder="请输入验证码">
          <template #prefix>
            <el-icon>
              <Unlock/>
            </el-icon>
          </template>
        </el-input>
        <img
            :src="captchaUrl"
            @click="refreshCaptcha"
            alt="验证码"
            class="captcha-img"
            style="cursor: pointer; border: 1px solid #ddd; border-radius: 4px;"
        >
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
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getCaptcha, login} from '@/api/auth';
import {Lock, Unlock, User,  View, Hide} from '@element-plus/icons-vue';
import Particles from "@/components/Particles.vue";
import {ElMessage} from "element-plus";
import store from '@/store';
import {validationRules} from "@/utils/validationRules";

const router = useRouter();

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  captcha: ''
});
const passwordVisible = ref(false);
const passwordType = ref('password');

//切换密码可见性
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
  passwordType.value = passwordVisible.value ? 'text' : 'password';
};

// 验证码 URL
const captchaUrl = ref('');

// 用户名，密码，验证码 element-plus 验证规则
const LoginRules = validationRules

// 声明 formRef 并绑定到 el-form 元素
const formRef = ref(null);

const handleLogin = async () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const loginData = {
        username: loginForm.value.username,
        password: loginForm.value.password,
        captcha: loginForm.value.captcha,
      };

      const {data} = await login(loginData);
      if (data.message === '登录成功') {
        await store.dispatch('login', {token: data.token, user: data.user});
        showSuccessMessage('登录成功');
        await router.push('/home');
      } else {
        showErrorMessage(data.message);
        refreshCaptcha(); // 刷新验证码
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('登录失败，请稍后重试！');
      refreshCaptcha(); // 刷新验证码
    }
  });
};

const goToRegister = () => {
  router.push('/register');
};

const refreshCaptcha = async () => {
  try {
    const response = await getCaptcha();
    const base64Image = arrayBufferToBase64(response.data);
    captchaUrl.value = `data:image/svg+xml;base64,${base64Image}`;
  } catch (error) {
    console.error('获取验证码失败', error);
    showErrorMessage('获取验证码失败，请稍后重试');
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

// 封装成功提示信息函数
const showSuccessMessage = (message) => {
  ElMessage({
    message,
    type: 'success'
  });
};

// 封装错误提示信息函数
const showErrorMessage = (message) => {
  ElMessage({
    message,
    type: 'error'
  });
};

// 初始化时获取验证码
onMounted(() => {
  refreshCaptcha();
});
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
    margin-right: 30px;
    .el-form-item {
      margin-bottom: 20px;
    }

    .captcha-item {
      display: flex;
      align-items: center;

      .el-input {
        flex: 1;
        margin-right: 10px;
      }

      .captcha-img {
        width: 100px;
        height: 30px;
        cursor: pointer;
      }
    }
  }

  .login-button {
    width: 100%;
  }
}
</style>
