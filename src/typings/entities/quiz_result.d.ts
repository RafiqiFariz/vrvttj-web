/// <reference path="../global.d.ts"/>

namespace Entity {
  interface QuizResult {
    id?: number
    quiz_id: number | string | null
    student_id: number | string | null
    total_questions: number
    correct_answers: number
    wrong_answers: number
    final_score: number
    completed_at: string
    quiz?: Entity.Quiz | null
    student?: Entity.Student | null
    created_at?: string
    updated_at?: string
  }
}
