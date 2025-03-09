<script lang="ts" setup>
import SidebarItem from './sidebar-item.vue'

defineOptions({
  name: 'sidebar',
})
// sidebar 组件
// 实现的功能
// 1. 传入width，以及 height 值，设置 sidebar 的宽度和高度
// 2. 传入一个数组用来渲染菜单项目，数组元素的类型包括可点击的item(需要传入icon，以及title，onClick)，
// 还可以传入children，用来渲染子菜单，子菜单采用递归的模式来设计，因此需要封装一个sidebar-item组件。
// 3. 传入的数组元素可以是分割线，用来分割菜单。
// 4. 传入的数组元素可以是一个标题，用来渲染标题。
// 5. 提供头部插槽，固定布局
// 6. 提供底部插槽，固定布局
// 7. 可以拖拽改变宽度，并传入一个最大宽度，最小宽度，以及onChangeWidth事件
// 8. 传入颜色，包括sidebar的背景颜色，主题色。

interface Props {
  width: string | number
  height: string | number
  color: {
    bg: string
    primary?: string
  }
}
const props = withDefaults(defineProps<Props>(), {})
const boxStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    backgroundColor: props.color.bg,
  }
})
const id = useId()

const testContentList = ref([
  {
    key:'home',
    title: '首页',
    icon: 'home',
    onClick: () => {
      console.log('点击了首页')
    },
  },
])
</script>

<template>
  <div :style="boxStyle" class="relative flex flex-col" :id="id">
    <section v-if="$slots.header" class="w-full" :id="`${id}-header`">
      <slot name="header"></slot>
    </section>
    <!-- <section class="overflow-auto bg-green flex-1">
      <SidebarItem
        v-for="item in testContentList"
        :key="item.key"
        :item="item"
      ></SidebarItem>
    </section> -->
    <section
      v-if="$slots.footer"
      class="absolute bottom-0 w-full"
      :id="`${id}-footer`"
    >
      <slot name="footer"></slot>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
