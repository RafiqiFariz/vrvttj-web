import type { Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // Tentukan apakah itu tautan eksternal. Jika ingin langsung membuka halaman web dan mencegat lompatan
    if (to.meta.href) {
      window.open(to.meta.href)
      return false
    }

    // Awal loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // Tentukan apakah ada TOKEN dan masuk untuk otentikasi
    const isLogin = Boolean(local.get('user'))

    if (!isLogin) {
      if (to.name === 'login')
        next()

      if (to.name !== 'login') {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    // Tentukan apakah rute telah diinisialisasi
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // Setelah perutean dinamis dimuat, kembali ke perutean root
      if (to.name === '404') {
      // Tunggu hingga rute izin dimuat dan kembali ke rute sebelumnya, jika tidak 404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return false
      }
    }

    // Tentukan apakah halaman saat ini sedang login, lalu cari halaman beranda.
    if (to.name === 'login') {
      next({ path: '/' })
      return false
    }

    next()
  })
  router.beforeResolve((to) => {
    // Penyorotan menu pengaturan
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
    // Tambahkan tab
    tabStore.addTab(to)
    // Tetapkan label sorotan
    tabStore.setCurrentTab(to.fullPath as string)
  })

  router.afterEach((to) => {
    // Ubah judul halaman web
    document.title = `${to.meta.title} - ${title}`
    // akhir loadingBar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
