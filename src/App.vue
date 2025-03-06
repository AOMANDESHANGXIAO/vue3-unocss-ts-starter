<script setup lang="ts">
import { useColorModeStore } from './stores/use-color-mode-store'

const colorModeStore = useColorModeStore()
</script>

<template>
  <div>
    <p>当前颜色模式：{{ colorModeStore.colorMode }}</p>
    <button
      @click="
        () => {
          colorModeStore.toggleColorMode()
        }
      "
    >
      切换颜色模式
    </button>
  </div>
</template>

<style scoped></style>
