import { defineStore } from 'pinia'
import { useLocalStorage, useColorMode } from '@vueuse/core'
type SelectedKeyHistoryItem = {
  key: string
  path: string
}
export const useSystemConfigStore = defineStore('systemConfigStore', () => {
  const presupposedThemes = ['default']
  const config = useLocalStorage('systemConfig', {
    colorMode: useColorMode().value,
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
    console.log('toggleColorMode')
    config.value.colorMode =
      config.value.colorMode === 'light' ? 'dark' : 'light'
    if (config.value.colorMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
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
