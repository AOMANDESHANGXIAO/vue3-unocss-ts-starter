import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import { routes } from 'vue-router/auto-routes'
console.log('routes\n', routes)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export { routes }
export default router
