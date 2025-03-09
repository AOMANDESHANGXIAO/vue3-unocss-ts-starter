<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { reactive, ref, watch, VueElement, h } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps, ItemType } from 'ant-design-vue'

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
}
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
  height: `calc(100vh - ${headerStyle.height}px)`,
}
const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'white',
  overflow: 'auto',
  height: `100vh - ${headerStyle.height}px`,
}
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
})
const items = reactive([
  {
    key: '1',
    icon: () => h(PieChartOutlined),
    label: 'Option 1',
    title: 'Option 1',
  },
  {
    key: '2',
    icon: () => h(DesktopOutlined),
    label: 'Option 2',
    title: 'Option 2',
  },
  {
    key: '3',
    icon: () => h(InboxOutlined),
    label: 'Option 3',
    title: 'Option 3',
  },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: 'Navigation One',
    title: 'Navigation One',
    children: [
      {
        key: '5',
        label: 'Option 5',
        title: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
        title: 'Option 6',
      },
      {
        key: '7',
        label: 'Option 7',
        title: 'Option 7',
      },
      {
        key: '8',
        label: 'Option 8',
        title: 'Option 8',
      },
    ],
  },
  {
    key: 'sub2',
    icon: () => h(AppstoreOutlined),
    label: 'Navigation Two',
    title: 'Navigation Two',
    children: [
      {
        key: '9',
        label: 'Option 9',
        title: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
        title: 'Option 10',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        title: 'Submenu',
        children: [
          {
            key: '11',
            label: 'Option 11',
            title: 'Option 11',
          },
          {
            key: '12',
            label: 'Option 12',
            title: 'Option 12',
          },
        ],
      },
    ],
  },
])
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
</script>

<template>
  <div class="w-full h-full overflow-hidden flex">
    <div class="relative h-full bg-white flex flex-col">
      <!-- 放置于右侧中间，用来折叠 -->
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
          @click="() => {}"
          id="menu"
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          style="flex: 1; max-width: 256px"
          mode="inline"
          :inline-collapsed="state.collapsed"
          :items="items"
        ></a-menu>
      </section>
    </div>
    <div class="flex-1"></div>
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
