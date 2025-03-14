import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/use-user-store'

console.log('routes\n', routes)

const getRedirectRoutes = () => {
  return [
    {
      path: '/',
      redirect: () => {
        // TODO: 根据用户权限动态分配路由
        const { isAuthenticated } = useUserStore()
        if (isAuthenticated) {
          return '/home'
        } else {
          return '/login'
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ]
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...getRedirectRoutes()],
})
export { routes }
export default router
