/// <reference path="../global.d.ts"/>

/** 用户数据库表字段 */
namespace Entity {
  interface User {
    id?: number
    username?: string
    photo?: string | null
    gender?: number | string | null
    nim?: string | null,
    nrp?: string | null,
    email: string
    password: string
    password_confirmation?: string
    name: string
    phone?: string | null
    role_id: string
    date_of_birth?: string | null
    place_of_birth?: string | null
    religion?: string | null
    address?: string | null
    role?: Entity.Role | null
    lecturer?: Entity.Lecturer | null
    student?: Entity.Student | null
    created_at?: string
    updated_at?: string
  }
}
