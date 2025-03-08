<script lang="ts" setup>
defineOptions({
    name: '[id]'
})
</script>

<template>
	<div>This is user/[id]</div>
  <p>{{ 'id is'+ $route.params.id }}</p>
</template>

<style lang="scss" scoped>

</style>
