import type { RouteLocationNormalized } from 'vue-router'
import { router } from '@/router'

interface TabState {
  pinTabs: RouteLocationNormalized[]
  tabs: RouteLocationNormalized[]
  currentTabPath: string
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      pinTabs: [],
      tabs: [],
      currentTabPath: '',
    }
  },
  getters: {
    allTabs: state => [...state.pinTabs, ...state.tabs],
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      // Tentukan apakah tab tidak perlu ditambahkan berdasarkan meta, cocok untuk halaman error, login, dll
      if (route.meta.withoutTab)
        return

      // Jangan tambahkan jika nama tab sudah ada
      if (this.hasExistTab(route.fullPath as string))
        return

      // Tambahkan ke grup berbeda berdasarkan meta.pinTab
      if (route.meta.pinTab)
        this.pinTabs.push(route)
      else
        this.tabs.push(route)
    },
    async closeTab(fullPath: string) {
      const tabsLength = this.tabs.length
      // Lakukan navigasi jika ada lebih dari satu tab dinamis
      if (this.tabs.length > 1) {
        // Dapatkan indeks tab yang akan ditutup
        const index = this.getTabIndex(fullPath)
        const isLast = index + 1 === tabsLength
        // Navigasi ke tab berikutnya jika tab saat ini ditutup
        if (this.currentTabPath === fullPath && !isLast) {
          router.push(this.tabs[index + 1].fullPath)
        }
        else if (this.currentTabPath === fullPath && isLast) {
          // Jika tab terakhir, navigasi ke tab sebelumnya
          router.push(this.tabs[index - 1].fullPath)
        }
      }
      // Hapus tab
      this.tabs = this.tabs.filter((item) => {
        return item.fullPath !== fullPath
      })
      // Jika semua tab dihapus, navigasi ke halaman default
      if (tabsLength - 1 === 0)
        router.push('/')
    },

    closeOtherTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i === index)
    },
    closeLeftTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i >= index)
    },
    closeRightTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i <= index)
    },
    clearAllTabs() {
      this.tabs.length = 0
      this.pinTabs.length = 0
    },
    closeAllTabs() {
      this.tabs.length = 0
      router.push('/')
    },

    hasExistTab(fullPath: string) {
      const _tabs = [...this.tabs, ...this.pinTabs]
      return _tabs.some((item) => {
        return item.fullPath === fullPath
      })
    },
    /* Atur tab aktif saat ini */
    setCurrentTab(fullPath: string) {
      this.currentTabPath = fullPath
    },
    getTabIndex(fullPath: string) {
      return this.tabs.findIndex((item) => {
        return item.fullPath === fullPath
      })
    },
    modifyTab(fullPath: string, modifyFn: (route: RouteLocationNormalized) => void) {
      const index = this.getTabIndex(fullPath)
      modifyFn(this.tabs[index])
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
