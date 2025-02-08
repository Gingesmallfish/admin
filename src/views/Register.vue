<template>
  <div class="Particles">
    <Particles/>
  </div>
  <div class="center">
    <div class="register-container">
      <div class="register-header">
        <h1>教务管理系统注册</h1>
      </div>
      <el-form :model="registerForm" :rules="RegisterRules" ref="formRef" label-width="80px" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码">
            <template #prefix>
              <el-icon>
                <Lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="registerForm.role" placeholder="请选择用户角色">
            <el-option label="学生" value="1"></el-option>
            <el-option label="教师" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" class="captcha-item">
          <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
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
          <el-button type="primary" @click="handleRegister" class="register-button">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link @click="goToLogin">已有账号？去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getCaptcha, register} from '@/api/auth';
import {Lock, Unlock, User} from '@element-plus/icons-vue';
import Particles from "@/components/Particles.vue";
import {ElMessage} from "element-plus";

const router = useRouter();

// 注册表单数据
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  captcha: ''
});

// 验证码 URL
const captchaUrl = ref('');

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

// 确认密码
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const RegisterRules = {
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  confirmPassword: [
    {required: true, message: '请再次输入密码', trigger: 'blur'},
    {validator: validateConfirmPassword, trigger: 'blur'}
  ],
  role: [
    {required: true, message: '请选择用户角色', trigger: 'change'}
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur'}
  ]
};

// 声明 formRef 并绑定到 el-form 元素
const formRef = ref(null);

const handleRegister = async () => {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      const registerData = {
        username: registerForm.value.username,
        password: registerForm.value.password,
        confirmPassword: registerForm.value.confirmPassword,
        role: parseInt(registerForm.value.role),
        captcha: registerForm.value.captcha,
      };

      const {data} = await register(registerData);
      if (data.message === '注册成功') {
        showSuccessMessage('注册成功,请登录');
        router.push('/login');
      } else {
        showErrorMessage(data.message);
        refreshCaptcha(); // 刷新验证码
      }
    } catch (error) {
      console.error(error);
      showErrorMessage('注册失败，请稍后重试！');
      refreshCaptcha(); // 刷新验证码
    }
  });
};

const goToLogin = () => {
  router.push('/login');
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



.center{
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

    .register-form {
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

    .register-button {
      width: 100%;
    }
  }
}

</style>
