import { defineStore } from 'pinia'
import { useLocalStorage, useColorMode } from '@vueuse/core'
import type { MenuTheme } from 'ant-design-vue'
type SelectedKeyHistoryItem = {
  key: string
  path: string
}
export const useSystemConfigStore = defineStore('systemConfigStore', () => {
  const presupposedThemes = ['default']
  const config = useLocalStorage('systemConfig', {
    colorMode: 'dark' as MenuTheme,
    theme: 'default',
    openKeys: ['home'],
    activeKey: 'home',
    selectedKeys: ['home'],
    preOpenKeys: ['home'] as string[],
    collapsed: false,
    selectedKeysHistory: [] as SelectedKeyHistoryItem[],
  })
  const toggleCollapsed = () => {
    config.value.collapsed = !config.value.collapsed
  }
  const toggleColorMode = () => {
    config.value.colorMode =
      config.value.colorMode === 'light' ? 'dark' : 'light'
  }
  const setTheme = (newTheme: string) => {
    document.documentElement.classList.remove(`theme-${config.value.theme}`)
    config.value.theme = newTheme
    document.documentElement.classList.add(`theme-${config.value.theme}`)
  }
  return {
    config,
    toggleCollapsed,
    toggleColorMode,
    setTheme,
    presupposedThemes,
  }
})
