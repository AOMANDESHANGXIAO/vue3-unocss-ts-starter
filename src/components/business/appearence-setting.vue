<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  useSystemConfigStore,
  type ColorScheme,
} from '@/stores/modules/use-system-config-store'
import { vHoverClass } from '@/directives/v-hover-class'

defineOptions({
  name: 'appearence-setting',
})
const systemConfigStore = useSystemConfigStore()
type ColorSwitcher = {
  label: string
  value: ColorScheme
  icon: string
  key: string
}
const colorSwitherList: Array<ColorSwitcher> = [
  {
    label: '浅色',
    value: 'light',
    icon: 'sun',
    key: 'light',
  },
  {
    label: '深色',
    value: 'dark',
    icon: 'moon',
    key: 'dark',
  },
  {
    label: '跟随系统',
    value: 'auto',
    icon: 'sun',
    key: 'auto',
  },
]
const hoverAnimateClass = 'animate__animated animate__tada'
</script>

<template>
  <div class="w-full">
    <p class="text-16px">颜色模式🪄</p>
    <div class="mt-5px flex justify-between">
      <div
        v-for="item in colorSwitherList"
        v-hover-class="hoverAnimateClass"
        @click="
          e => {
            systemConfigStore.switchColorMode(e, item.value)
          }
        "
        :key="item.key"
        class="flex flex-col items-center cursor-pointer"
      >
        <section
          class="box-border rounded-xl w-100px h-50px flex justify-center items-center"
          :class="{
            active: systemConfigStore.config.colorModeSelect === item.value,
          }"
        >
          <FontAwesomeIcon :icon="item.icon" />
        </section>
        <p class="mt-5px">{{ item.label }}</p>
      </div>
    </div>
    <p class="text-16px mt-10px">主题色✨</p>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.box-border {
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
}
.dark .box-border {
  border: 1px solid rgba($color: #ffffff, $alpha: 0.2);
}
.active {
  border: 2px solid rgb(var(--color-primary));
}
.dark .active {
  border: 2px solid rgb(var(--color-primary));
}
</style>
