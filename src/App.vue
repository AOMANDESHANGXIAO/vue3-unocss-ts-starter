<script lang="ts" setup>
import MenuPage from '@/components/business/MenuPage.vue'
import { RouterView, useRoute } from 'vue-router'
import { useCssVar } from '@vueuse/core'
import { rgbToHex } from '@/utils/color'
import { useSystemConfigStore } from '@/stores/use-system-config-store'

defineOptions({
  name: 'app',
})
const systemConfigStore = useSystemConfigStore()
const systemConfig = toRef(systemConfigStore.config)
const currentRoute = useRoute()
const isRouteInMenu = computed(() => {
  return currentRoute.meta.showInMenu
})
const antTheme = computed(() => {
  return {
    token: {
      colorPrimary: rgbToHex(useCssVar('--color-primary').value as string),
    },
  }
})
</script>

<template>
  <a-config-provider :theme="antTheme">
    <div id="root" :class="[systemConfig.colorMode]">
      <component :is="isRouteInMenu ? MenuPage : RouterView"></component>
    </div>
  </a-config-provider>
</template>

<style lang="scss">
#root {
  --color-deep-dark-color: #001529;
}
.light {
  --color-text: #1e2939;
  --color-bg: #f8fafc;
  color: var(--color-text);
  background-color: var(--color-bg);
}
.dark {
  --color-text: white;
  --color-bg: #1e2939;
  color: var(--color-text);
  background-color: var(--color-bg);
}
</style>
