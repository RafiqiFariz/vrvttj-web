/// <reference path="../global.d.ts"/>

namespace Entity {
  interface QuizQuestion {
    id?: number
    quiz_id: number | string | null
    question: string
    weight: number
    quiz?: Entity.Quiz | null
    options?: Entity.QuizOption[]
    created_at?: string
    updated_at?: string
  }
}
