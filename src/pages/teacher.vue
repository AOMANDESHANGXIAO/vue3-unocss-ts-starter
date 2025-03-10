<route lang="json">
{
  "name": "teacher",
  "meta": {
    "title": "教师管理",
    "icon": "chalkboard-teacher",
    "menuOrder": 3
  }
}
</route>
<script lang="ts" setup>
defineOptions({
  name: 'about',
})
</script>

<template>
  <div>This is teacher page</div>
  <RouterView :key="$route.fullPath"></RouterView>
</template>

<style lang="scss" scoped></style>
