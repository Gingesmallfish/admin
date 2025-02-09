<template>
  <el-form :model="registerForm" :rules="rules" ref="formRef" label-width="80px" class="register-form">
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
      <Captcha :captchaUrl="captchaUrl" @refresh-captcha="emit('refresh-captcha')"></Captcha>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleRegister" class="register-button">{{ props.button }}</el-button>
    </el-form-item>
    <el-form-item>
      <el-link @click="$emit('go-to-login')">{{ props.goToLogin }}</el-link>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { register } from '@/api/auth';
import { ElMessage } from 'element-plus';
import { Lock, Unlock, User } from '@element-plus/icons-vue';
import Captcha from "@/components/Auth/Captcha.vue";
import {RegisterRules} from '@/utils/validationRules';


const rules = RegisterRules;

const props = defineProps({
  captchaUrl: String,
  button: {
    type: String,
    default: '注册'
  },
  // 注册按钮
  goToLogin: {
    type: String,
    default: '没有账号？去登录'
  }
});

const emit = defineEmits(['refresh-captcha', 'go-to-login']);

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  captcha: ''
});

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

      const { data } = await register(registerData);
      if (data.message === '注册成功') {
        ElMessage.success('注册成功,请登录');
        emit('go-to-login');
      } else {
        ElMessage.error(data.message);
        emit('refresh-captcha'); // 刷新验证码
      }
    } catch (error) {
      console.error(error);
      ElMessage.error('注册失败，请稍后重试！');
      emit('refresh-captcha'); // 刷新验证码
    }
  });
};
</script>

<style scoped lang="scss">
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

  .register-button {
    width: 100%;
  }
}
</style>
