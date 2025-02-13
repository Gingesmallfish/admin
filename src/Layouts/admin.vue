<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>
          <FHeader />
        </el-header>
        <el-main>
          <!-- <router-view /> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from "@/Layouts/components/FHeader.vue";
</script>

<style scoped lang="scss">
.common-layout {
  @apply h-screen;
}

.el-container {
  @apply h-full;
}

.el-aside {
  @apply bg-gray-800 text-white;
}

.el-header {
  @apply bg-indigo-500 text-white;
}

.el-main {
  @apply p-4;
}
</style>
