<route lang="json">
{
  "meta": {
    "title": "登录界面",
    "showInMenu": false
  }
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import {
  UserOutlined,
  LockOutlined,
  LayoutOutlined,
} from '@ant-design/icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  useSystemConfigStore,
  type Theme,
} from '@/stores/modules/use-system-config-store'
import { rgbToHex } from '@/utils/color'

const systemConfigStore = useSystemConfigStore()
const { toggleColorMode, config } = systemConfigStore
defineOptions({
  name: 'login',
})

const formRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const formState = ref({
  username: '',
  password: '',
})

const handleFinish = async (values: any) => {
  loading.value = true
  try {
    // TODO: 实现登录逻辑
    console.log('登录信息：', values)
    message.success('登录成功')
  } catch (error) {
    message.error('登录失败')
  } finally {
    loading.value = false
  }
}
const show = () => {
  const dom = document.getElementById('xb-color-selector')
  if (!dom) {
    return
  }
  dom.style.width = 'auto'
  const { width } = dom.getBoundingClientRect()
  dom.style.width = '0px'
  setTimeout(() => {
    dom.style.width = `${width}px`
  }, 0)
}
const hide = () => {
  const dom = document.getElementById('xb-color-selector')
  if (!dom) {
    return
  }
  dom.style.width = '0px'
}
const handleClickColorSelector = (item: Theme) => {
  systemConfigStore.setTheme(item)
}
</script>

<template>
  <div
    class="rounded-full p-x-20px fixed z-100 top-10px right-10px h-12 bg-#f3f4f6 dark:bg-#1f2937 flex items-center"
    @mouseleave="hide"
  >
    <div
      id="xb-color-selector"
      @mouseleave="hide"
      class="w-0 flex items-cente transition-width-500 overflow-hidden"
    >
      <div
        class="flex justify-center items-center gap-15px h-full rounded-full bg-#f3f4f6 dark:bg-#1f2937"
      >
        <span
          v-for="(item, index) in systemConfigStore.themes"
          @click="handleClickColorSelector(item)"
          :key="item.key"
          class="w-20px h-20px rounded-full flex justify-center items-center"
          :class="{
            'mr-15px': index === systemConfigStore.themes.length - 1,
          }"
          :style="{
            backgroundColor: rgbToHex(item.cssVars['--color-primary']),
            cursor: 'pointer',
          }"
        >
          <FontAwesomeIcon
            v-if="item.key === config.themeKey"
            icon="check"
            color="#fff"
          ></FontAwesomeIcon>
        </span>
      </div>
    </div>

    <FontAwesomeIcon
      icon="palette"
      class="cursor-pointer z-1"
      :style="{
        color: rgbToHex(config.cssVars['--color-primary']),
      }"
      @mouseenter="show"
    ></FontAwesomeIcon>

    <LayoutOutlined class="cursor-pointer ml-15px z-1" />

    <FontAwesomeIcon
      @click="toggleColorMode"
      :icon="config.colorMode === 'dark' ? 'moon' : 'sun'"
      class="z-1 cursor-pointer hover:rotate-45 transition-transform-300 ml-15px"
    ></FontAwesomeIcon>
  </div>

  <div
    class="relative box-border min-h-screen flex bg-gradient-to-br overflow-hidden"
  >
    <div class="flex-1"></div>

    <div
      class="flex justify-center items-center bg-white dark:bg-deep-dark rounded-lg shadow-lg w-34% p-8 animate-fade-in-up"
    >
      <main class="w-80%">
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2 opacity-70">欢迎回来👋</h1>
          <p class="text-gray-600">请输入您的账号和密码~</p>
        </div>

        <a-form ref="formRef" :model="formState" @finish="handleFinish">
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <a-input
              v-model:value="formState.username"
              size="large"
              placeholder="用户名"
            >
              <template #prefix>
                <UserOutlined class="text-gray-400" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="密码"
            >
              <template #prefix>
                <LockOutlined class="text-gray-400" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="flex justify-between items-center mb-4">
            <a-checkbox v-model:checked="rememberMe"> 记住我 </a-checkbox>
            <a class="text-blue-500 hover:text-blue-600"> 忘记密码？ </a>
          </div>

          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            class="w-full"
            size="large"
          >
            {{ loading ? '登录中...' : '登录' }}
          </a-button>
        </a-form>
      </main>
    </div>
  </div>
</template>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
