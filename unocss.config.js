import { defineConfig } from 'unocss'

const colors = [
  'primary',
  'success',
  'warning',
  'danger',
  'error',
  'info',
  'deep-dark',
]
const bgColorRules = colors.map(color => [
  `bg-${color}`,
  {
    'background-color': `rgb(var(--color-${color}))`,
  },
])
const textColorRules = colors.map(color => [
  `text-color-${color}`,
  ,
  {
    color: `rgb(var(--color-${color}))`,
  },
])
/**
 * 自定义规则添加前缀cu
 */
export default defineConfig({
  rules: [
    ...bgColorRules,
    ...textColorRules,
    [
      [
        /^cu-border-(.+)$/,
        ([, c]) => ({ border: `1px solid rgb(var(--color-${c}))` }),
      ],
    ],
  ],
})
