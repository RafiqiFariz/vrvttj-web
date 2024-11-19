import { router } from '@/router'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'
import { fetchLogin, getAuthenticatedUser } from '@/service'

interface AuthStatus {
  user: Entity.User | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      user: local.get('user') as Entity.User | null,
    }
  },
  getters: {
    isLogin(state) {
      return Boolean(state.user)
    },
  },
  actions: {
    async logout() {
      const route = unref(router.currentRoute)
      // Hapus cache lokal
      this.clearAuthStorage()

      // Hapus perutean, menu, dan data lainnya
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()

      // Hapus data tab
      const tabStore = useTabStore()
      tabStore.clearAllTabs()

      // Reset store saat ini
      this.$reset()

      // Redirect ke halaman login
      if (route.meta.requiresAuth) {
        router.push({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        })
      }
    },

    clearAuthStorage() {
      local.remove('user')
    },

    async fetchUser() {
      try {
        const user = await getAuthenticatedUser()
        if (!user?.data)
          return

        this.user = user.data
        this.clearAuthStorage()
        local.set('user', user.data)
      }
      catch (e) {
        console.warn('[Fetch User Error]:', e)
      }
    },

    async login(email: string, password: string) {
      try {
        const user = await fetchLogin({ email, password })

        if (!user?.data)
          return

        await this.handleLoginInfo(user.data)
      }
      catch (e) {
        console.warn('[Login Error]:', e)
      }
    },

    async handleLoginInfo(data: any) {
      local.set('user', data)

      // Menambahkan rute dan menu
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // Redirect
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/',
      })
    },
  },
})
