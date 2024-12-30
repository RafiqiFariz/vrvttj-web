declare namespace AppRoute {

  type MenuType = 'dir' | 'page'
  /** Meta yang dibawa oleh setiap rute */
  interface RouteMeta {
    /* Judul halaman, biasanya wajib. */
    title: string
    /* Ikon, biasanya digunakan bersama dengan menu */
    icon?: string
    /* Apakah membutuhkan otorisasi login. */
    requiresAuth?: boolean
    /* Peran yang dapat mengakses */
    roles?: Entity.RoleType[]
    /* Apakah halaman menggunakan cache */
    keepAlive?: boolean
    /* Beberapa rute tidak ingin ditampilkan dalam menu, seperti halaman edit tertentu. */
    hide?: boolean
    /* Urutan menu. */
    order?: number
    /* Tautan eksternal tertanam */
    href?: string
    /** Rute saat ini tidak ditampilkan di menu kiri, tetapi perlu menyoroti menu tertentu */
    activeMenu?: string
    /** Apakah rute saat ini akan ditambahkan ke Tab */
    withoutTab?: boolean
    /** Apakah rute saat ini akan dipasang di Tab, digunakan untuk beberapa halaman permanen */
    pinTab?: boolean
    /** Apakah rute saat ini adalah direktori atau halaman di menu kiri, default adalah halaman */
    menuType?: MenuType
  }

  type MetaKeys = keyof RouteMeta

  interface baseRoute {
    /** Nama rute (identifikasi unik rute) */
    name: string
    /** Jalur rute */
    path: string
    /** Pengalihan rute */
    redirect?: string
    /* Alamat komponen halaman */
    componentPath?: string | null
    /* ID rute */
    id: number
    /* ID rute induk, halaman tingkat atas adalah null */
    pid: number | null
  }

  /** Struktur tipe rute tunggal (mode rute dinamis: backend mengembalikan struktur tipe ini untuk rute) */
  type RowRoute = RouteMeta & baseRoute

  /**
   * Struktur rute nyata yang dipasang ke proyek
   */
  interface Route extends baseRoute {
    /** Rute anak */
    children?: Route[]
    /* Komponen halaman */
    component: any
    /** Deskripsi rute */
    meta: RouteMeta
  }

}
