/** Tipe terkait permintaan */
declare namespace Service {
  import type { Method } from 'alova'

  interface AlovaConfig {
    baseURL: string
    timeout?: number
    beforeRequest?: (method: Method<globalThis.Ref<unknown>>) => void
  }

  /** Konfigurasi struktur data yang dikembalikan oleh antarmuka backend */
  interface BackendConfig {
    /** Properti yang menunjukkan kode status permintaan dari backend */
    codeKey?: string
    /** Properti yang menunjukkan data permintaan dari backend */
    dataKey?: string
    /** Properti yang menunjukkan pesan dari backend */
    msgKey?: string
    /** Status yang didefinisikan backend sebagai permintaan berhasil secara bisnis */
    successCode?: number | string
  }

  type RequestErrorType = 'Response Error' | 'Business Error' | null
  type RequestCode = string | number

  interface RequestError {
    /** Jenis kesalahan permintaan layanan */
    errorType: RequestErrorType
    /** Kode kesalahan */
    code: RequestCode
    /** Pesan kesalahan */
    message: string
    /** Data yang dikembalikan */
    data?: any
  }

  interface ResponseResult<T> extends RequestError {
    /** Apakah permintaan layanan berhasil */
    isSuccess: boolean
    /** Jenis kesalahan permintaan layanan */
    errorType: RequestErrorType
    /** Kode kesalahan */
    code: RequestCode
    /** Pesan kesalahan */
    message: string
    /** Data yang dikembalikan */
    data: T
  }
}
