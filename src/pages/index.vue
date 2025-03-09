<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { reactive, ref, watch, VueElement, h } from 'vue'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
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

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('Navigation One', 'sub1', () => h(MailOutlined), [
    getItem(
      'Item 1',
      'g1',
      null,
      [getItem('Option 1', '1'), getItem('Option 2', '2')],
      'group'
    ),
    getItem(
      'Item 2',
      'g2',
      null,
      [getItem('Option 3', '3'), getItem('Option 4', '4')],
      'group'
    ),
  ]),

  getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem(
    'Group',
    'grp',
    null,
    [getItem('Option 13', '13'), getItem('Option 14', '14')],
    'group'
  ),
])

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e)
}

watch(openKeys, val => {
  console.log('openKeys', val)
})
</script>

<template>
  <div class="w-full h-full overflow-hidden flex">
    <div
      class="overflow-hidden w-200px h-full bg-white flex flex-col border-r border-gray-200"
    >
      <header class="flex-shrink-0 h-50px"></header>
      <section class="flex-1 overflow-y-auto overflow-x-hidden hidden-scrollbar">
        <a-menu
          id="dddddd"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="width: 200px; flex: 1"
          mode="inline"
          :items="items"
          @click="handleClick"
        ></a-menu>
      </section>
    </div>
    <div class="flex-1 border-l-black">
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
  border:none !important;
} 
</style>
