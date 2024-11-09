/// <reference path="../global.d.ts"/>

/* 角色数据库表字段 */
namespace Entity {
  type RoleType = 'admin' | 'lecturer' | 'student'

  interface Role {
    id?: string | null
    name?: RoleType | string | null
  }
}
