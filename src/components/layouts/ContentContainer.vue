<script lang="ts" setup>
defineOptions({
  name: 'content-container',
})
</script>

<template>
  <div class="w-full h-full p-20px box-border">
    <div class="bg-white dark:bg-deep-dark rounded-xl p-20px">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
