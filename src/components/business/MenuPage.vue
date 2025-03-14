<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NotificationOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'
import router, { routes } from '@/routers'
import { useSystemConfigStore } from '@/stores/modules/use-system-config-store'
import { UserApi } from '@/apis/modules/user'

UserApi.getUserInfo().then(res => {
  console.log('get User Info res', res)
})

const systemConfigStore = useSystemConfigStore()
const {
  toggleCollapsed,
  toggleColorMode,
  addSelectedKeyHistory,
} = systemConfigStore
const systemConfig = toRef(systemConfigStore.config)
// const handleClickSwitcher = (e: MouseEvent) => {
//   const { clientX, clientY } = e
//   console.log('clientX', clientX, 'clientY', clientY)
// }
const transformRouteToMenu = (route: RouteRecordRaw) => {
  const meta = route.meta
  if (!meta) return
  if (!meta.showInMenu) {
    return void 0
  }
  if (!meta.icon) {
    return {
      key: route.name,
      label: meta!.title,
      title: meta!.title,
      // In fact, the generated `route.name` represents the complete path, rather than `route.path`.
      path: route.name,
    }
  }
  return {
    key: route.name,
    icon: () => h(FontAwesomeIcon, { icon: meta!.icon as string }),
    label: meta!.title,
    title: meta!.title,
    path: route.name,
    iconName: meta!.icon,
  }
}

const mapRouteToMenu = (routes: RouteRecordRaw[]): MenuProps['items'] => {
  const routes_ = _.cloneDeep(routes)
  return _.sortBy(routes_, route => {
    return route.meta?.menuOrder || 0
  }).map((route: RouteRecordRaw) => {
    if (route.children) {
      return {
        ...transformRouteToMenu(route),
        children: mapRouteToMenu(route.children),
      }
    }
    return transformRouteToMenu(route) as MenuProps['items']
  }) as MenuProps['items']
}
const items = mapRouteToMenu(routes)?.filter(Boolean)
console.log(items)
const menuStyle = computed(() => {
  return {
    flex: 1,
    'min-width': systemConfig.value.collapsed ? '30px' : '200px',
  }
})
// The type, e.g,MenuProps['onClick'], provided by ant-design-vue is not correct.
// So that, I use any here.
const handleMenuClick = (e: any) => {
  if (!e) return
  console.log('e', e)
  if (e.item.originItemValue.path) {
    addSelectedKeyHistory({
      key: e.key,
      path: e.item.originItemValue.path,
      title: e.item.originItemValue.title,
      icon: e.item.originItemValue.iconName,
    })
    systemConfig.value.activeKey = e.key
    console.log('e.item.originItemValue.path', e.item.originItemValue.path)
    router.push({
      path: e.item.originItemValue.path,
      replace: true,
    })
  }
  // router.push(e.)
}
const handleClickTab = ({ path, key }: { path: string; key: string }) => {
  systemConfig.value.activeKey = key
  router.push(path)
}
// const handleClickRemoveTab = (key: string) => {
//   removeSelectedKeyHistory(key)
// }
</script>

<template>
  <div class="w-100vw h-100vh overflow-hidden flex">
    <!-- Menu -->
    <div
      id="menu"
      class="relative h-full bg-white flex flex-col dark:bg-deep-dark gray-border transition-width-300"
      :class="{
        'w-200px': !systemConfig.collapsed,
        'w-80px': systemConfig.collapsed,
      }"
    >
      <header class="flex-shrink-0 h-50px text-center line-height-50px">
        <a-space align="center">
          <FontAwesomeIcon
            icon="graduation-cap"
            class="text-16px text-primary"
          />
          <span class="text-16px" v-if="!systemConfig.collapsed"
            >教务管理系统</span
          >
        </a-space>
      </header>
      <section
        class="flex-1 overflow-y-auto overflow-x-hidden hidden-scrollbar"
      >
        <a-menu
          @click="handleMenuClick"
          id="menu"
          v-model:openKeys="systemConfig.openKeys"
          v-model:selectedKeys="systemConfig.selectedKeys"
          :style="menuStyle"
          mode="inline"
          :theme="systemConfig.colorMode"
          :inline-collapsed="systemConfig.collapsed"
          :items="items"
        >
        </a-menu>
      </section>
    </div>
    <!-- Content -->
    <div class="flex-1 flex flex-col gray-border">
      <header
        class="flex-shrink-0 h-50px flex items-center justify-between bg-white dark:bg-deep-dark p-x-16px p-l-0"
      >
        <component
          @click="toggleCollapsed"
          class="text-16px"
          :is="systemConfig.collapsed ? MenuFoldOutlined : MenuUnfoldOutlined"
        ></component>
        <a-space size="large">
          <div
            class="rounded-2xl dark:bg-gray-700 p-x-16px p-y-4px bg-#f4f4f5 cursor-pointer hover:scale-105 transition-all-300"
          >
            <a-space size="small" align="center">
              <FontAwesomeIcon icon="search"></FontAwesomeIcon>
              <span>搜索</span>
              <div class="dark:bg-gray-8 p-x-6px rounded-r-2xl text-small">
                Ctrl K
              </div>
            </a-space>
          </div>
          <!-- setting icon-->
          <FontAwesomeIcon
            icon="cog"
            class="cursor-pointer hover:rotate-45 transition-transform-300"
          ></FontAwesomeIcon>
          <!-- color mode icon -->
          <Transition name="fade">
            <FontAwesomeIcon
              @click="toggleColorMode"
              :icon="systemConfig.colorMode === 'dark' ? 'moon' : 'sun'"
              class="cursor-pointer hover:rotate-45 transition-transform-300"
            ></FontAwesomeIcon>
          </Transition>
          <a-badge dot>
            <notification-outlined
              :style="{
                color: systemConfig.colorMode === 'dark' ? 'white' : 'black',
              }"
            />
          </a-badge>
          <a-space align="center" size="small">
            <a-avatar
              src="https://ai-public.mastergo.com/ai/img_res/a8bf73a294afd78156d5860b6d704d78.jpg"
            ></a-avatar
            ><span class="text-14px color-inherit">张老师</span>
          </a-space>
        </a-space>
      </header>
      <main id="main-container" class="flex-1">
        <TransitionGroup
          name="list"
          tag="ul"
          id="tabs"
          class="flex items-center bg-white dark:bg-deep-dark p-x-8px gap-25px"
        >
          <li
            v-for="item in systemConfigStore.config.selectedKeysHistory"
            :key="item.key"
            @click="handleClickTab(item)"
            class="cursor-pointer p-y-8px p-x-8px text-14px transition-all-300"
            :class="{
              'tab-item': true,
              'text-primary border-b-primary active':
                systemConfig.activeKey === item.key,
              'opacity-70 hover:opacity-100':
                systemConfig.activeKey !== item.key,
            }"
          >
            <FontAwesomeIcon
              v-if="item.icon"
              :icon="item.icon"
              class="mr-8px"
            ></FontAwesomeIcon
            ><span> {{ item.title }}</span>
          </li>
        </TransitionGroup>
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in" :appear="false">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style lang="scss">
.hidden-scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
}
.text-primary {
  color: rgb(var(--color-primary));
}
.border-b-primary {
  border-bottom: 2px solid rgb(var(--color-primary));
}
li {
  list-style: none;
}
#tabs {
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
}
.dark #tabs {
  border-bottom: 1px solid rgba($color: #ffffff, $alpha: 0.2);
}
#main-container {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.2);
  border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
}
.dark #main-container {
  border-top: 1px solid rgba($color: #ffffff, $alpha: 0.2);
  border-left: 1px solid rgba($color: #ffffff, $alpha: 0.2);
}
:deep(.ant-menu-line) {
  border: none !important;
}
::view-transition-new(root),
::view-transition-old(root) {
  /* 关闭默认动画，否则影响自定义动画的执行 */
  animation: none;
}
.dark::view-transition-old(root) {
  z-index: 100;
}
.light::view-transition-new(root) {
  z-index: 100;
}
</style>
