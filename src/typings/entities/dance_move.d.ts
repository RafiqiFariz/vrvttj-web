/// <reference path="../global.d.ts"/>

namespace Entity {
  interface DanceMove {
    id?: number
    dance_id: number | null
    dance_part_id: number | null
    name: string
    picture?: string | File
    description?: string
    dance?: Entity.Dance
    dance_part?: Entity.DancePart
  }
}
