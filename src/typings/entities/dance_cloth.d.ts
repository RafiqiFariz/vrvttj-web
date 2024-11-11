/// <reference path="../global.d.ts"/>

namespace Entity {
  interface DanceClothes {
    id?: number
    dance_id: number | null
    name: string
    picture?: string | File
    asset_path?: string | File
    description?: string
    dance?: Entity.Dance
  }
}
