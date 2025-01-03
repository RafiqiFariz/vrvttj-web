import { local } from '@/utils'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import adapterFetch from 'alova/fetch'
import VueHook, { type VueHookType } from 'alova/vue'
import {
  DEFAULT_ALOVA_OPTIONS,
  DEFAULT_BACKEND_OPTIONS,
} from './config'
import {
  handleBusinessError,
  handleRefreshToken,
  handleResponseError,
  handleServiceResult,
} from './handle'

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<VueHookType>({
  // Penentuan token kedaluwarsa di sisi server
  refreshTokenOnSuccess: {
    // Ketika server mengembalikan 401, menandakan token telah kedaluwarsa
    isExpired: (response, method) => {
      const isExpired = method.meta && method.meta.isExpired
      return response.status === 401 && !isExpired
    },

    // Ketika token kedaluwarsa, fungsi ini akan dipanggil untuk menyegarkan token
    handler: async (_response, method) => {
      // Batasi agar permintaan yang kedaluwarsa tidak terus-menerus dikirim ulang
      if (!method.meta)
        method.meta = { isExpired: true }
      else
        method.meta.isExpired = true

      await handleRefreshToken()
    },
  },
  // Menambahkan token ke header permintaan
  assignToken: (method) => {
    method.config.headers.Authorization = `Bearer ${local.get('accessToken')}`
  },
})

// Dokumentasi alova.js https://alova.js.org/
export function createAlovaInstance(
  alovaConfig: Service.AlovaConfig,
  backendConfig?: Service.BackendConfig,
) {
  const _backendConfig = { ...DEFAULT_BACKEND_OPTIONS, ...backendConfig }
  const _alovaConfig = { ...DEFAULT_ALOVA_OPTIONS, ...alovaConfig }

  return createAlova({
    statesHook: VueHook,
    requestAdapter: adapterFetch(),
    cacheFor: null,
    baseURL: _alovaConfig.baseURL,
    timeout: _alovaConfig.timeout,

    beforeRequest: onAuthRequired((method) => {
      if (method.meta?.isFormPost) {
        method.config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        method.data = new URLSearchParams(method.data as URLSearchParams).toString()
      }
      alovaConfig.beforeRequest?.(method)
    }),
    responded: onResponseRefreshToken({
      // Interceptor untuk permintaan yang berhasil
      onSuccess: async (response, method) => {
        const { status } = response

        if (status === 200) {
          // Mengembalikan data blob
          if (method.meta?.isBlob)
            return response.blob()

          // Mengembalikan data JSON
          const apiData = await response.json()
          // Permintaan berhasil
          if (apiData[_backendConfig.codeKey] === _backendConfig.successCode)
            return handleServiceResult(apiData)

          // Gagal pada permintaan bisnis
          const errorResult = handleBusinessError(apiData, _backendConfig)
          return handleServiceResult(errorResult, false)
        }
        // Permintaan API gagal
        const errorResult = handleResponseError(response)
        return handleServiceResult(errorResult, false)
      },
      onError: (error, method) => {
        const tip = `[${method.type}] - [${method.url}] - ${error.message}`
        window.$message?.warning(tip)
      },

      onComplete: async (_method) => {
        // Logika yang dijalankan setelah permintaan selesai
      },
    }),
  })
}
