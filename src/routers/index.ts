import { createRouter, createWebHashHistory } from 'vue-router'
//@ts-ignore
import { routes } from 'vue-router/auto-routes'
import { useUserStore } from '@/stores/modules/use-user-store'
import routerMitter from './modules/event-mitter'

console.log('routes\n', routes)

const getRedirectRoutes = () => {
  return [
    {
      path: '/',
      redirect: () => {
        const { isAuthenticated } = useUserStore()
        if (isAuthenticated) {
          return '/home'
        } else {
          return '/auth/login'
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
// TODO: 添加路由守卫
export { routes, routerMitter }
export default router
