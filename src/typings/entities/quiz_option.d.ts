/// <reference path="../global.d.ts"/>

namespace Entity {
  interface QuizOption {
    id?: number
    quiz_question_id?: number | string | null
    answer: string
    is_correct: boolean
    quiz_question?: Entity.QuizQuestion | null
    created_at?: string
    updated_at?: string
  }
}
