<template>
  <div class="common-layout">
    <el-container>
      <el-header class="no-padding">
        <FHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from "@/Layouts/components/FHeader.vue";
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh; // 确保占据整个视口高度
}

.no-padding {
  padding: 0; // 移除 el-header 的默认内边距
}
</style>
