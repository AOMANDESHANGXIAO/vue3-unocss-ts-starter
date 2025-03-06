import { defineStore } from 'pinia'
import { useLocalStorage, useColorMode } from '@vueuse/core'

export const useColorModeStore = defineStore('colorMode', () => {
  const colorMode = useLocalStorage('colorMode', useColorMode())
  const toggleColorMode = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
    if (colorMode.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  return {
    colorMode,
    toggleColorMode
  }
})
