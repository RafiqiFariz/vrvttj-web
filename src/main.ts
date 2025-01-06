import type { App } from 'vue'
import { installRouter } from '@/router'
import { installPinia } from '@/store'
import AppVue from './App.vue'
import AppLoading from './components/common/AppLoading.vue'
import axios from 'axios'
import vue3dLoader from "vue-3d-loader";

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

async function setupApp() {
  // Loading
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // Vue
  const app = createApp(AppVue)

  // Pinia
  await installPinia(app)

  // Vue-router
  await installRouter(app)

  // Vue-3d-loader
  app.use(vue3dLoader)

  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
      eager: true,
    }),
  ).map(i => app.use(i))

  appLoading.unmount()

  app.mount('#app')
}

setupApp()
