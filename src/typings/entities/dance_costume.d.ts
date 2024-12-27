/// <reference path="../global.d.ts"/>

namespace Entity {
  interface DanceCostume {
    id?: number
    dance_id: number | null
    name: string
    picture?: string | File
    asset_path?: string | File
    description?: string
    dance?: Entity.Dance
    created_at?: string
    updated_at?: string
  }
}
