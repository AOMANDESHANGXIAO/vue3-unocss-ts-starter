import { defineStore } from 'pinia'
import { useLocalStorage, useDark, useToggle } from '@vueuse/core'
import _ from 'lodash'
import type { MenuTheme } from 'ant-design-vue'
export type SelectedKeyHistoryItem = {
  key: string
  path: string
  title: string
  icon: string
}
export type Theme = {
  name: string
  key: string
  cssVars: Record<string, string>
}
export const useSystemConfigStore = defineStore('system-config-store', () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
  })
  const toggleDark = useToggle(isDark)
  const themes: Theme[] = [
    {
      name: '深蓝',
      key: 'shenlan',
      cssVars: {
        '--color-primary': '22, 119, 255',
      },
    },
    {
      name: '春意',
      key: 'shilan',
      cssVars: {
        '--color-primary': '47, 169, 104',
      },
    },
    {
      name: '亮橙',
      key: 'liangcheng',
      cssVars: {
        '--color-primary': '236, 82, 40',
      },
    },
    {
      name: '韵味',
      key: 'yunwei',
      cssVars: {
        '--color-primary': '70, 53, 177',
      },
    },
    {
      name: '精致',
      key: 'jingzhi',
      cssVars: {
        '--color-primary': '76, 88, 91',
      },
    },
  ]
  const defaultCssVars = {
    '--color-primary': '22, 119, 255',
    '--color-success': '47, 169, 104',
    '--color-warning': '241, 169, 54',
    '--color-danger': '213, 68, 97',
    '--color-error': '213, 68, 97',
    '--color-info': '144, 147, 153',
    '--color-deep-dark': '20, 20, 20',
    '--color-gray': '28, 31, 35',
  }
  const getThemeCssVarsByKey = (key: string) => {
    return themes.find(i => i.key === key)?.cssVars || defaultCssVars
  }
  const setTheme = (newTheme: Theme) => {
    if (newTheme.key === config.value.themeKey) return
    if(themes.find(i => i.key === newTheme.key) === undefined) return
    config.value.themeKey = newTheme.key
    config.value.cssVars = _.merge({}, defaultCssVars, newTheme.cssVars)
  }
  const config = useLocalStorage('systemConfig', {
    colorMode: 'dark' as MenuTheme,
    theme: 'default',
    openKeys: ['home'],
    activeKey: 'home',
    selectedKeys: ['home'],
    preOpenKeys: ['home'] as string[],
    collapsed: false,
    selectedKeysHistory: [] as SelectedKeyHistoryItem[],
    themeKey: 'shenlan',
    cssVars: _.merge({}, defaultCssVars, getThemeCssVarsByKey('shenlan')),
  })
  if (config.value.colorMode === 'dark' && isDark.value === false) {
    toggleDark()
  }
  const toggleCollapsed = () => {
    config.value.collapsed = !config.value.collapsed
  }
  const toggleColorMode = async (e: MouseEvent) => {
    // 以下代码是为了实现一个主题切换的动画
    const transition = document.startViewTransition(() => {
      config.value.colorMode =
        config.value.colorMode === 'light' ? 'dark' : 'light'
      toggleDark()
    })
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = e
      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`,
      ]
      const isDark = config.value.colorMode === 'dark'
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: isDark ? clipPath.reverse() : clipPath,
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      )
    })
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
    themes,
    addSelectedKeyHistory,
    removeSelectedKeyHistory,
  }
})
