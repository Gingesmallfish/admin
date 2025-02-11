<template>
  <el-form :model="registerForm" :rules="rules" ref="formRef" label-width="80px" class="register-form">
    <!-- 用户名 -->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="registerForm.username" placeholder="请输入用户名">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" type="password" placeholder="请输入密码">
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 确认密码 -->
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码">
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 用户角色 -->
    <el-form-item label="用户角色" prop="role">
      <el-select v-model="registerForm.role" placeholder="请选择用户角色">
        <el-option label="学生" value="1" />
        <el-option label="教师" value="2" />
      </el-select>
    </el-form-item>

    <!-- 验证码 -->
    <el-form-item label="验证码" prop="captcha" class="captcha-item">
      <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
        <template #prefix>
          <el-icon>
            <Unlock />
          </el-icon>
        </template>
      </el-input>
      <Captcha :captchaUrl="captchaUrl" @refresh-captcha="refreshCaptcha" />
    </el-form-item>

    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleRegister" class="register-button">{{ props.button }}</el-button>
    </el-form-item>

    <!-- 跳转到登录 -->
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

// props 和事件定义
const props = defineProps({
  captchaUrl: String,
  button: {
    type: String,
    default: '注册',
  },
  goToLogin: {
    type: String,
    default: '没有账号？去登录',
  },
});

const emit = defineEmits(['refresh-captcha', 'go-to-login']);

// 注册表单数据
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: '',
  captcha: '',
});



// 注册验证码
const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.value.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择用户角色', trigger: 'change' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为 4 个字符', trigger: 'blur' }
  ]
};



// 表单引用
const formRef = ref(null);


const handleRegister = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return;
    }

    const { username, password, confirmPassword, role, captcha } = registerForm.value;
    const registerData = { username, password, confirmPassword, role: parseInt(role), captcha };

    // 使用 then 和 catch 处理异步操作
    register(registerData)
      .then(({ data }) => {
        if (data.message === '注册成功') {
          ElMessage.success('注册成功,请登录');
          emit('go-to-login');
        } else {
          ElMessage.error(data.message);
          refreshCaptcha(); // 刷新验证码
        }
      })
      .catch((error) => {
        console.error(error);
        ElMessage.error('注册失败，请稍后重试！');
        refreshCaptcha(); // 刷新验证码
      });
  });
};

// 刷新验证码
const refreshCaptcha = () => {
  emit('refresh-captcha');
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
