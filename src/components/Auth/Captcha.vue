<template>
  <img
      :src="captchaUrl"
      @click="$emit('refresh-captcha')"
      alt="验证码"
      class="captcha-img"
      style="cursor: pointer; border-radius: 4px;"
  >
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  captchaUrl: String
});

const emit = defineEmits(['refresh-captcha']);
</script>

<style scoped lang="scss">
.captcha-img {
  width: 100px;
  height: 30px;
  cursor: pointer;
}
</style>
