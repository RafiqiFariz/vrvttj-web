// import { fetchUpdateToken } from '@/service'
import { useAuthStore } from '@/store'
import { local } from '@/utils'
import {
  ERROR_NO_TIP_STATUS,
  ERROR_STATUS,
} from './config'

type ErrorStatus = keyof typeof ERROR_STATUS

/**
 * @description: Handles requests that succeed but the backend server returns an error
 * @param {Response} response
 * @return {*}
 */
export function handleResponseError(response: Response) {
  const error: Service.RequestError = {
    errorType: 'Response Error',
    code: 0,
    message: ERROR_STATUS.default,
    data: null,
  }
  const errorCode: ErrorStatus = response.status as ErrorStatus
  const message = ERROR_STATUS[errorCode] || ERROR_STATUS.default
  Object.assign(error, { code: errorCode, message })

  showError(error)

  return error
}

/**
 * @description: Handles business logic errors returned by the backend
 * @param {Record} data Data returned from the backend
 * @param {Service} config Backend field configuration
 * @return {*}
 */
export function handleBusinessError(data: Record<string, any>, config: Required<Service.BackendConfig>) {
  const { codeKey, msgKey } = config
  const error: Service.RequestError = {
    errorType: 'Business Error',
    code: data[codeKey],
    message: data[msgKey],
    data: data.data,
  }

  showError(error)

  return error
}

/**
 * @description: Standardizes the return types for success and failure
 * @param {any} data
 * @param {boolean} isSuccess
 * @return {*} result
 */
export function handleServiceResult(data: any, isSuccess: boolean = true) {
  const result = {
    isSuccess,
    errorType: null,
    ...data,
  }
  return result
}

/**
 * @description: Handles token refresh logic for API requests
 * @return {*}
 */
export async function handleRefreshToken() {
  const authStore = useAuthStore()
  const isAutoRefresh = import.meta.env.VITE_AUTO_REFRESH_TOKEN === 'Y'
  if (!isAutoRefresh) {
    await authStore.logout()
    return
  }

  // Refresh the token
  // const { data } = await fetchUpdateToken({ refreshToken: local.get('refreshToken') })
  // if (data) {
  //   local.set('accessToken', data.accessToken)
  //   local.set('refreshToken', data.refreshToken)
  // }
  // else {
  //   // Refresh failed, log out
  //   await authStore.logout()
  // }
}

/**
 * @description: Displays error messages
 * @param {Service.RequestError} error
 * @return {*}
 */
export function showError(error: Service.RequestError) {
  // Skip if the error does not require a message
  const code = Number(error.code)
  if (ERROR_NO_TIP_STATUS.includes(code))
    return

  window.$message.error(error.message)
}
