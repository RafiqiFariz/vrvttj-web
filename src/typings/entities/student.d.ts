/// <reference path="../global.d.ts"/>

/* 角色数据库表字段 */
namespace Entity {
  interface Student {
    id?: number
    nim?: string
    user?: Entity.User | null
    created_at?: string
    updated_at?: string
  }
}
