<route lang="json">
{
  "name": "teacher",
  "meta": {
    "title": "教师管理",
    "icon": "chalkboard-teacher",
    "menuOrder": 3,
    "showInMenu": true
  }
}
</route>
<script lang="ts" setup>
defineOptions({
  name: 'about',
})
</script>

<template>
  <div>
    <div>This is teacher page</div>
    <RouterView :key="$route.fullPath"></RouterView>
  </div>
</template>

<style lang="scss" scoped></style>
