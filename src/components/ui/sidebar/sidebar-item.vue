<script lang="ts" setup>
defineOptions({
  name: 'sidebar-item',
})
const props = withDefaults(
  defineProps<{
    item: {
      title: string
      icon?: string
      onClick: () => void
      children?: {
        title: string
        icon: string
        onClick: () => void
      }[]
    }
  }>(),
  {}
)
</script>

<template>
  <div class="w-full h-40px p-x-16px bg-red my-16px">
    <i :class="`i-${props.item.icon}`" v-if="props.item.icon"></i>
    <span>{{props.item.title}}</span>
  </div>
</template>

<style lang="scss" scoped></style>
