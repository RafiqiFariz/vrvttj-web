/// <reference path="../global.d.ts"/>

namespace Entity {
  interface StudentAnswer {
    id?: number
    quiz_attempt_id: number | string | null
    quiz_question_id: number | string | null
    quiz_option_id: number | string | null
    is_correct: boolean
    quiz_attempt?: Entity.QuizAttempt | null
    quiz_question?: Entity.QuizQuestion | null
    quiz_option?: Entity.QuizOption | null
    created_at?: string
    updated_at?: string
  }
}
