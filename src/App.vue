<script setup lang="ts">
import { useColorModeStore } from './stores/use-color-mode-store'

const colorModeStore = useColorModeStore()
</script>

<template>
  <div>
    <p>当前颜色模式：{{ colorModeStore.colorMode }}</p>
    <button
      class="p-4 bg-danger text-white rounded-md"
      @click="
        () => {
          colorModeStore.toggleColorMode()
        }
      "
    >
      切换颜色模式
    </button>
    <div class="w-[400px] h-[400px] box"></div>
  </div>
</template>

<style scoped>
.box {
  background-color: rgb(var(--color-primary));
}
</style>
