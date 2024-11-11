/// <reference path="../global.d.ts"/>

namespace Entity {
  interface Dance {
    id?: number
    dance_type_id: number | null
    name: string
    picture?: string | File
    description?: string
    dance_type?: Entity.DanceType
  }
}
