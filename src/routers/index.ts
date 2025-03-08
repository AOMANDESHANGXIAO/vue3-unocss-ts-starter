import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
