<script lang="ts" setup>
defineOptions({
    name: 'index'
})
</script>

<template>
	<div>This is home page
  </div>
  <div><RouterView :key="$route.fullPath"></RouterView></div>
</template>

<style lang="scss" scoped>

</style>
