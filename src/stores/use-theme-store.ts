import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const presupposedThemes = ['default']
  const theme = useLocalStorage('theme', 'default')
  const setTheme = (newTheme: string) => {
    document.documentElement.classList.remove(`theme-${theme.value}`)
    theme.value = newTheme
    document.documentElement.classList.add(`theme-${theme.value}`)
  }
  return {
    theme,
    setTheme,
    presupposedThemes,
  }
})
