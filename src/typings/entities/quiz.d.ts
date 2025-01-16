/// <reference path="../global.d.ts"/>

namespace Entity {
  interface Quiz {
    id?: number
    title: string
    allowed_attempts: number
    description?: string
    created_at?: string
    updated_at?: string
  }
}
