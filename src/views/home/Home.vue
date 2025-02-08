<template>
  <div>
    <h2>注册</h2>
    <el-form :model="form" :rules="rules" ref="registerForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="用户角色" prop="role">
        <el-select v-model="form.role" placeholder="请选择用户角色">
          <el-option label="学生" value="1"></el-option>
          <el-option label="教师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="form.captcha" style="width: 60%;"></el-input>
        <img :src="captchaImage" alt="验证码" @click="fetchCaptcha" style="cursor: pointer; margin-left: 10px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
    <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon></el-alert>
    <el-alert v-if="successMessage" :title="successMessage" type="success" show-icon></el-alert>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElAlert } from 'element-plus';
import { register, getCaptcha } from '@/api/auth';
import { useStore } from 'vuex';

const store = useStore();

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  role: '1',
  captcha: '',
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择用户角色', trigger: 'change' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ],
};

const captchaImage = ref('');

const errorMessage = ref('');
const successMessage = ref('');

const registerForm = ref(null);

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致!'));
  } else {
    callback();
  }
};

const submitForm = (formName) => {
  registerForm.value.validate((valid) => {
    if (valid) {
      const registerData = {
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: parseInt(form.role),
        captcha: form.captcha,
      };

      register(registerData)
        .then(response => {
          successMessage.value = response.data.message;
          errorMessage.value = '';
        })
        .catch(error => {
          if (error.response) {
            errorMessage.value = error.response.data.message;
          } else {
            errorMessage.value = '注册失败，请稍后重试';
          }
          successMessage.value = '';
        });
    } else {
      console.log('验证失败!');
      return false;
    }
  });
};

const fetchCaptcha = () => {
  getCaptcha()
    .then(response => {
      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      captchaImage.value = `data:image/svg+xml;base64,${base64Image}`;
      errorMessage.value = '';
    })
    .catch(error => {
      errorMessage.value = '获取验证码失败，请稍后重试';
    });
};

fetchCaptcha();
</script>

<style scoped>
.el-form {
  width: 300px;
  margin: 0 auto;
}
.el-alert {
  margin-top: 20px;
}
</style>
