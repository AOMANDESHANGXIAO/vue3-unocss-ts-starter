<route lang="json">
{
  "name": "home",
  "meta": {
    "title": "首页",
    "icon": "home"
  }
}
</route>

<script lang="ts" setup>
import { reactive, watch, h } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import { routes } from './routers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import _ from 'lodash'
import router from './routers'

const state = reactive({
  collapsed: false,
  selectedKeys: ['home'],
  openKeys: ['home'],
  preOpenKeys: ['home'] as string[],
})

const transformRouteToMenu = (route: RouteRecordRaw) => {
  const meta = route.meta
  return {
    key: route.name,
    icon: () => h(FontAwesomeIcon, { icon: meta!.icon as string }),
    label: meta!.title,
    title: meta!.title,
    path: route.path,
  }
}
const items = routes.map((route: RouteRecordRaw) => {
  let result = {
    ...transformRouteToMenu(route),
    children:
      route.children?.map(child => {
        return {
          ...transformRouteToMenu(child),
          title: child.meta!.title,
        }
      }) || [],
  }
  if (result.children?.length === 0) {
    return _.omit(result, 'children')
  }
  return result
})
console.log('items', items)
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed
  state.openKeys = state.collapsed ? [] : state.preOpenKeys
}
const menuStyle = computed(() => {
  return {
    flex: 1,
    'min-width': state.collapsed ? '30px' : '120px',
  }
})
// The type, e.g,MenuProps['onClick'], provided by ant-design-vue is not correct.
// So that, I use any here.
const handleMenuClick = (e: any) => {
  if(!e) return
  console.log('e', e.item.originItemValue.path)
  if(e.item.originItemValue.path) {
    router.push(e.item.originItemValue.path)
  }
  // router.push(e.)
}
</script>

<template>
  <div class="w-100vw h-100vh overflow-hidden flex">
    <div class="relative h-full bg-white flex flex-col">
      <!-- This button was used to toggle the collapsed state -->
      <div class="absolute right-0 top-50% z-10 transform translate-x-50%">
        <a-button
          @click="toggleCollapsed"
          type="primary"
          size="small"
          shape="circle"
        >
          <MenuFoldOutlined v-if="state.collapsed" />
          <MenuUnfoldOutlined v-else />
        </a-button>
      </div>
      <header
        class="flex-shrink-0 h-50px text-center line-height-50px"
      ></header>
      <section
        class="flex-1 overflow-y-auto overflow-x-hidden hidden-scrollbar"
      >
        <a-menu
          @click="handleMenuClick"
          id="menu"
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          :style="menuStyle"
          mode="inline"
          :inline-collapsed="state.collapsed"
          :items="items"
        >
        </a-menu>
      </section>
    </div>
    <div class="flex-1">
      <RouterView :key="$route.fullPath"></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hidden-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
}

:deep(.ant-menu-inline) {
  border: none !important;
}
</style>
