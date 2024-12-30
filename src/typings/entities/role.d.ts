/// <reference path="../global.d.ts"/>

namespace Entity {
  type RoleType = 'admin' | 'lecturer' | 'student'

  interface Role {
    id?: string | null
    name: RoleType | string | null
    created_at?: string
    updated_at?: string
  }
}
