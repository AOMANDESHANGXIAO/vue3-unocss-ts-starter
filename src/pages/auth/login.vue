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
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

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

const rules: Record<string, Rule[]> = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
}

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
</script>

<template>
  <div class="mb-8">
    <h1 class="text-3xl font-bold mb-2 opacity-70">欢迎回来👋</h1>
    <p class="text-gray-600">请输入您的账号和密码~</p>
  </div>

  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @finish="handleFinish"
  >
    <a-form-item
      name="username"
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
  <a-divider class="my-4"
    >还没有账号?<RouterLink to="/auth/register"
      >&nbsp;点击注册</RouterLink
    ></a-divider
  >
</template>

<style>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
.animate-float-y {
  animation: floatY 5s linear 0s infinite;
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
@keyframes floatY {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
#xb-login-hero__bg {
  background: linear-gradient(
    154deg,
    #fff 30%,
    rgb(var(--color-primary)) 48%,
    #fff 64%
  );
  filter: blur(100px);
}
.dark #xb-login-hero__bg {
  background: linear-gradient(
    154deg,
    #07070915 30%,
    rgb(var(--color-primary)) 48%,
    #07070915 64%
  );
  filter: blur(100px);
}
</style>
