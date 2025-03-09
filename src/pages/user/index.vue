<script lang="ts" setup>
import SideBar from '@/components/ui/sidebar/index.vue'
defineOptions({
  name: 'index',
})
const sideBarProps = {
  width: '200px',
  height: '100vh',
  color: {
    bg: 'white',
  },
}
</script>

<template>
  <SideBar v-bind="sideBarProps"/>
</template>

<style></style>
