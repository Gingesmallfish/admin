<template>
  <div class="Particles">
    <Particles/>
  </div>
  <div class="login-container">
    <div class="login-header">
      <h1>教务管理系统登录</h1>
    </div>
    <el-form :model="loginForm" :rules="LoginRules" :size="'large'"  ref="formRef" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"  placeholder="请输入用户名">
          <template #prefix>
            <el-icon>
              <User/>
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
          <template #prefix>
            <el-icon>
              <Lock/>
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
        <img src="http://localhost:3000/api/captcha" @click="refreshCaptcha" ref="captcha" alt="验证码" class="captcha-img">
      </el-form-item>
      <el-form-item>
        <div class="button">
          <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
          <el-button type="info" @click="handleRecent" class="login-button">重置</el-button>
        </div>

      </el-form-item>
      <el-form-item>
        <el-link @click="goToRegister">没有账号？去注册</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {login} from '@/api/auth';
import {Lock, Unlock, User} from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';
import Particles from "@/components/Particles.vue";

const router = useRouter();
const store = useStore();
const formRef = ref(null);
const loginForm = ref({
  username: '',
  password: '',
  captcha: ''
});


// 处理验证码
const refreshCaptcha = () => {
  this.$refs.captcha.src = `http://localhost:3000/api/captcha?t=${Date.now()}`;
};


// 用户名，密码，验证码element-plus验证规则
const LoginRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur'}
  ]
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

const handleLogin = async () => {
  const success = await store.dispatch('login', loginForm.value);

  if (success) {
    showSuccessMessage('登录成功')
    router.push('/home');
  } else {
    showErrorMessage('登录失败，请检查用户名、密码或验证码')
  }

};

const goToRegister = () => {
  router.push('/register');
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

.login-container {
  width: 350px; /* 设置合适的宽度 */
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

    .captcha-item {
      display: flex;
      align-items: center;

      .el-input {
        flex: 1;
        margin-right: 10px;
      }

      .captcha-img {
        height: 40px;
        cursor: pointer;
      }
    }
  }

  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .login-button {
     width: 100px;
      margin-right: 10px;
    }
  }

}
</style>
