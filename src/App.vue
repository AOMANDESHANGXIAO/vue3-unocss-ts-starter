<script lang="ts" setup>
import MenuPage from '@/components/business/MenuPage.vue'
import { RouterView, useRoute } from 'vue-router'
import { theme } from 'ant-design-vue'
import { useCssVar } from '@vueuse/core'
import { rgbToHex } from '@/utils/color'

defineOptions({
  name: 'app',
})
const currentRoute = useRoute()
const isRouteInMenu = computed(() => {
  return currentRoute.meta.showInMenu
})
const antTheme = computed(() => {
  return {
    token: {
      colorPrimary: rgbToHex(useCssVar('--color-primary').value as string),
    },
    algorithm: theme.defaultAlgorithm,
  }
})
</script>

<template>
  <a-config-provider :theme="antTheme">
    <div id="root">
      <component :is="isRouteInMenu ? MenuPage : RouterView"></component>
    </div>
  </a-config-provider>
</template>

<style lang="scss"></style>
