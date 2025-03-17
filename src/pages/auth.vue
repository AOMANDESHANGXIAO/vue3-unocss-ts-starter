<route lang="json">
{
  "meta": {
    "title": "登录界面",
    "showInMenu": false
  }
}
</route>

<script lang="ts" setup>
import {
  LayoutOutlined,
} from '@ant-design/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useWindowSize } from '@vueuse/core'
import {
  useSystemConfigStore,
  type Theme,
} from '@/stores/modules/use-system-config-store'
import { rgbToHex } from '@/utils/color'

defineOptions({
  name: 'login',
})

const systemConfigStore = useSystemConfigStore()
const { toggleColorMode, config } = systemConfigStore


const show = () => {
  const dom = document.getElementById('xb-color-selector')
  if (!dom) {
    return
  }
  dom.style.width = 'auto'
  const { width } = dom.getBoundingClientRect()
  dom.style.width = '0px'
  setTimeout(() => {
    dom.style.width = `${width}px`
  }, 0)
}
const hide = () => {
  const dom = document.getElementById('xb-color-selector')
  if (!dom) {
    return
  }
  dom.style.width = '0px'
}
const handleClickColorSelector = (item: Theme) => {
  systemConfigStore.setTheme(item)
}
const { width } = useWindowSize()
const MIN_WINDOW_WIDTH = 768
const showHero = computed(() => {
  return width.value > MIN_WINDOW_WIDTH
})
</script>

<template>
  <!-- 右上角的工具栏,包含主题切换,布局切换，颜色模式切换 -->
  <div
    class="rounded-full p-x-20px fixed z-100 top-10px right-10px h-12 bg-#f3f4f6 dark:bg-#1f2937 flex items-center"
    @mouseleave="hide"
  >
    <div
      id="xb-color-selector"
      @mouseleave="hide"
      class="w-0 flex items-cente transition-width-500 overflow-hidden"
    >
      <div
        class="flex justify-center items-center gap-15px h-full rounded-full bg-#f3f4f6 dark:bg-#1f2937"
      >
        <span
          v-for="(item, index) in systemConfigStore.themes"
          @click="handleClickColorSelector(item)"
          :key="item.key"
          class="w-20px h-20px rounded-full flex justify-center items-center"
          :class="{
            'mr-15px': index === systemConfigStore.themes.length - 1,
          }"
          :style="{
            backgroundColor: rgbToHex(item.cssVars['--color-primary']),
            cursor: 'pointer',
          }"
        >
          <FontAwesomeIcon
            v-if="item.key === config.themeKey"
            icon="check"
            color="#fff"
          ></FontAwesomeIcon>
        </span>
      </div>
    </div>

    <FontAwesomeIcon
      icon="palette"
      class="cursor-pointer"
      :style="{
        color: rgbToHex(config.cssVars['--color-primary']),
      }"
      @mouseenter="show"
    ></FontAwesomeIcon>

    <LayoutOutlined class="cursor-pointer ml-15px" />

    <FontAwesomeIcon
      @click="toggleColorMode"
      :icon="config.colorMode === 'dark' ? 'moon' : 'sun'"
      class="z-1 cursor-pointer hover:rotate-45 transition-transform-300 ml-15px"
    ></FontAwesomeIcon>
  </div>

  <div
    class="relative box-border min-h-screen flex bg-gradient-to-br overflow-hidden"
  >
    <div
      v-show="showHero"
      class="relative flex-1 flex flex-col justify-center items-center"
    >
      <div id="xb-login-hero__bg" class="absolute w-full h-full"></div>

      <div class="w-60% h-60% animate-float-y">
        <img src="@/assets/images/welcome.svg" class="w-full h-full" />
      </div>

      <p class="text-3xl mb-2 opacity-70">Welcome to XB-Admin</p>
      <p class="opacity-70">
        基于Vue3 + Ant Design + UnoCss + TypeScript + Pinia + Vue-router
      </p>
    </div>

    <div
      class="flex justify-center items-center bg-white dark:bg-deep-dark rounded-lg shadow-lg p-8 animate-fade-in-up"
      :class="{
        'w-34%': showHero,
        'w-100%': !showHero,
      }"
    >
      <main class="w-80%">
        <!-- include -->
        <RouterView :key="$route.fullPath"/>
      </main>
    </div>
  </div>
</template>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
.animate-float-y {
  animation: floatY 5s linear 0s infinite;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes floatY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
#xb-login-hero__bg {
  background: linear-gradient(
    154deg,
    #fff 30%,
    rgb(var(--color-primary)) 48%,
    #fff 64%
  );
  filter: blur(100px);
}
.dark #xb-login-hero__bg {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    rgb(var(--color-primary)) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}
</style>
