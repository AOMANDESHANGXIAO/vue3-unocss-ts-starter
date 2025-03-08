<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="w-100vw h-100vh">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped></style>
