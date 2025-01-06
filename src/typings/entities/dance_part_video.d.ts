/// <reference path="../global.d.ts"/>

namespace Entity {
  interface DancePartVideo {
    id?: number
    dance_part_id: number | null
    thumbnail_path?: string | File
    video_path: string | File
    description?: string
    created_at?: string
    updated_at?: string
    dance_part?: Entity.DancePart
  }
}
