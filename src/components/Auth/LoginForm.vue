<template>
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
      <Captcha :captchaUrl="captchaUrl" @refresh-captcha="$emit('refresh-captcha')" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit" class="login-button">{{ props.title }}</el-button>
    </el-form-item>
    <el-form-item>
    <el-link @click="$emit('go-To-Register')">{{ props.register }}</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Lock, Unlock, User } from '@element-plus/icons-vue';
import { validationRules } from '@/utils/validationRules';
import Captcha from "@/components/Auth/Captcha.vue";

const props = defineProps({
  captchaUrl: String,
  title: {
    type: String,
    default: '登录',
  },
  register: {
    type: String,
    default: '没有账号？去注册'
  }
});

const LoginRules = validationRules

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
});


const passwordVisible = ref(false);
const passwordType = ref('password');

const formRef = ref(null);

const emit = defineEmits(['submit', 'refresh-captcha','go-To-Register']);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
  passwordType.value = passwordVisible.value ? 'text' : 'password';
};

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', loginForm);
    } else {
      console.error('表单验证失败');
    }
  });
};
</script>

<style scoped lang="scss">
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
  }

  .login-button {
    width: 100%;
  }
}
</style>
