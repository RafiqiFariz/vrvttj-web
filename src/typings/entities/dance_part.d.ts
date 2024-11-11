/// <reference path="../global.d.ts"/>

namespace Entity {
  interface DancePart {
    id?: number
    name: string
    picture?: string | File
    description?: string
    created_at?: string
    updated_at?: string
  }
}
