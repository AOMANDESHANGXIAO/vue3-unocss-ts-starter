<script lang="ts" setup>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuProps } from 'ant-design-vue'
import { routes } from './routers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { NotificationOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'
import router from './routers'
import { useSystemConfigStore } from './stores/use-system-config-store'

const systemConfigStore = useSystemConfigStore()
const { toggleCollapsed, toggleColorMode } = systemConfigStore
const systemConfig = toRef(systemConfigStore.config)
const colorModeModel = ref(systemConfig.value.colorMode === 'dark')
watch(
  () => colorModeModel.value,
  () => {
    toggleColorMode()
  }
)
const transformRouteToMenu = (route: RouteRecordRaw) => {
  const meta = route.meta
  if (!meta) return
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
const items = mapRouteToMenu(routes)
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
    router.push(e.item.originItemValue.path)
  }
  // router.push(e.)
}
</script>

<template>
  <a-config-provider>
    <div
      class="w-100vw h-100vh overflow-hidden flex"
      :class="[systemConfig.colorMode]"
    >
      <div class="sidebar relative h-full bg-white flex flex-col">
        <!-- This button was used to toggle the collapsed state -->
        <div class="absolute right-0 top-50% z-10 transform translate-x-50%">
          <a-button
            @click="toggleCollapsed"
            type="primary"
            size="small"
            shape="circle"
          >
            <MenuFoldOutlined v-if="systemConfig.collapsed" />
            <MenuUnfoldOutlined v-else />
          </a-button>
        </div>
        <header
          class="flex-shrink-0 h-50px text-center line-height-50px border-b-gray-7"
        >
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
      <div class="flex-1 flex flex-col">
        <header
          class="header flex-shrink-0 h-50px flex items-center justify-between bg-white b-l-[1px_solid_#foo] p-x-16px"
        >
          <a-space>
            <div class="p-x-16px p-y-8px border-b-primary cursor-pointer">
              <span class="text-primary">教师信息</span>
              <FontAwesomeIcon
                icon="close"
                class="ml-2px text-12px text-gray hover:text-gray-700 cursor-pointer"
              ></FontAwesomeIcon>
            </div>
            <div class="p-x-16px p-y-8px">教学安排</div>
          </a-space>
          <a-space>
            <a-switch
              v-model:checked="colorModeModel"
              checkedChildren="浅色"
              unCheckedChildren="深色"
            ></a-switch>
            <a-badge dot>
              <notification-outlined :style="{
                color: systemConfig.colorMode === 'dark' ? 'white' : 'black'
              }"/>
            </a-badge>
            <a-avatar
              size="small"
              src="https://ai-public.mastergo.com/ai/img_res/a8bf73a294afd78156d5860b6d704d78.jpg"
            ></a-avatar
            ><span class="text-14px color-inherit">张老师</span>
          </a-space>
        </header>
        <main class="flex-1">
          <RouterView :key="$route.fullPath"></RouterView>
        </main>
      </div>
    </div>
  </a-config-provider>
</template>

<style lang="scss">
$deep-dark-color:#001529;
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
  .sidebar {
    background-color: $deep-dark-color;
  }
  .header {
    background-color: $deep-dark-color;
  }
}
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
:deep(.ant-menu-inline) {
  border: none !important;
}

</style>
