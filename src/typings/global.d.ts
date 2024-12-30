/* Menyimpan tipe tabel entitas database, isi detail ada di ./entities */
declare namespace Entity {
}

/* Tipe data yang dikembalikan oleh berbagai antarmuka, isi detail ada di ./api */
declare namespace Api {

}

declare global {
  interface Window {
    $loadingBar: import('naive-ui').LoadingBarApi
    $dialog: import('naive-ui').DialogApi
    $message: import('naive-ui').MessageApi
    $notification: import('naive-ui').NotificationApi
  }
}

declare const AMap: any
declare const BMap: any

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare namespace NaiveUI {
  type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning'
}

declare namespace Storage {
  interface Session {
    dict: DictMap
  }

  interface Local {
    /* Menyimpan informasi pengguna */
    userInfo: Entity.User
    /* Menyimpan akun login */
    loginAccount: any
    /* Menyimpan bahasa saat ini */
    lang: App.lang
  }
}

export declare namespace App {
  type lang = 'idID' | 'enUS'
}

interface DictMap {
  [key: string]: Entity.Dict[]
}
