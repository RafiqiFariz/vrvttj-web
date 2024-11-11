/// <reference path="../global.d.ts"/>

namespace Entity {
  interface QuizAttempt {
    id?: number
    quiz_id: number | string | null
    student_id: number | string | null
    score: number
    started_at: string
    finished_at: string
    quiz?: Entity.Quiz | null
    student?: Entity.Student | null
    created_at?: string
    updated_at?: string
  }
}
