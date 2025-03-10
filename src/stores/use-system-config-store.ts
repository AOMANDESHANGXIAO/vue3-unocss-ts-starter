import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { MenuTheme } from 'ant-design-vue'
type SelectedKeyHistoryItem = {
  key: string
  path: string
  title: string
}
export const useSystemConfigStore = defineStore('systemConfigStore', () => {
  const presupposedThemes = ['default','spring']
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
  const addSelectedKeyHistory = (item: SelectedKeyHistoryItem) => {
    if (config.value.selectedKeysHistory.find(i => i.key === item.key)) {
      return
    }
    config.value.selectedKeysHistory.push(item)
    if (config.value.selectedKeysHistory.length > 5) {
      config.value.selectedKeysHistory.shift()
    }
  }
  const removeSelectedKeyHistory = (key: string) => {
    // 如果只有一个，就不删除
    if (config.value.selectedKeysHistory.length === 1) {
      console.log('只有一个，不删除')
      return
    }
    // 如果删除的是最后一个，就把倒数第二个作为activeKey
    if (
      key ===
      config.value.selectedKeysHistory[
        config.value.selectedKeysHistory.length - 1
      ].key
    ) {
      config.value.selectedKeysHistory.pop()
      config.value.activeKey =
        config.value.selectedKeysHistory[
          config.value.selectedKeysHistory.length - 1
        ].key
      console.log('删除最后一个,现在的activeKey=', config.value.activeKey)
      return
    }
    // 如果删除的是activeKey
    if (key === config.value.activeKey) {
      config.value.activeKey =
        config.value.selectedKeysHistory[
          config.value.selectedKeysHistory.length - 1
        ].key
      console.log('删除activeKey,现在的activeKey=', config.value.activeKey)
    }
    config.value.selectedKeysHistory = config.value.selectedKeysHistory.filter(
      i => i.key !== key
    )
  }
  return {
    config,
    toggleCollapsed,
    toggleColorMode,
    setTheme,
    presupposedThemes,
    addSelectedKeyHistory,
    removeSelectedKeyHistory,
  }
})
