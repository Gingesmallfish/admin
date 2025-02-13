<template>
  <el-form :model="loginForm" :rules="LoginRules" ref="formRef" label-width="70px" class="login-form space-y-6 pr-7">
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        prefix-icon="User"
        class="w-full"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        :type="passwordType"
        placeholder="请输入密码"
        prefix-icon="Lock"
        @click:append="togglePasswordVisibility"
        class="w-full"
      >
        <template #suffix>
          <el-icon @click="togglePasswordVisibility" class="cursor-pointer">
            <component :is="passwordVisible ? 'View' : 'Hide'" />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha" class="captcha-item flex items-center ">
      <el-input
        v-model="loginForm.captcha"
        placeholder="请输入验证码"
        prefix-icon="Unlock"
        class="flex-1"
      />
      <Captcha :captchaUrl="captchaUrl" @refresh-captcha="$emit('refresh-captcha')" class="mx-1" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSubmit"
        @keyup.enter="handleSubmit"
        class="login-button bg-blue-500 text-white py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        :disabled="isSubmitting"
      >
        {{ props.title }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-link
        tabindex="0"
        @click="handleRegisterClick"
        @keyup.enter="handleRegisterClick"
        class="text-blue-500"
      >
        {{ props.register }}
      </el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { validationRules } from '@/utils/validationRules';
import Captcha from "@/components/Auth/Captcha.vue";

// 接收父组件传递的 props
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

const LoginRules = validationRules;

const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
});

const passwordVisible = ref(false);
const passwordType = ref('password');

const formRef = ref(null);

const isSubmitting = ref(false);

const emit = defineEmits(['submit', 'refresh-captcha', 'go-To-Register']);

// 切换密码可见性
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
  passwordType.value = passwordVisible.value ? 'text' : 'password';
};

// 提交表单
const handleSubmit = () => {
  if (isSubmitting.value) return; // 如果正在提交中，防止重复提交
  isSubmitting.value = true; // 开始提交表单， 设置状态为提交中

  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', loginForm);
    } else {
      console.error('表单验证失败');
    }
  });
};

// 跳转到注册页面
const handleRegisterClick = () => {
  emit('go-To-Register');
};

// 关掉浏览器直接删除token
window.addEventListener('beforeunload', () => {
  localStorage.removeItem('token');
});
</script>

<style scoped lang="scss">
/* 如果有特殊样式需求，可以在这里添加 */
</style>
