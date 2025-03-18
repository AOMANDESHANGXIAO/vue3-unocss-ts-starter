<script lang="ts" setup>
import menuPageContent from './menu-page-content.vue';
import menuPageLoading from './menu-page-loading.vue';
defineOptions({
    name: 'menu-page'
})
</script>

<template>
  <Suspense>
    <template #default>
      <menuPageContent/>
    </template>
    <template #fallback>
      <menuPageLoading/>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>

</style>
