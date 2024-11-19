import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchQuizAttemptList(params: {
  page?: number,
  paginate?: boolean,
  includeQuiz?: boolean,
  includeStudent?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, includeQuiz: false, includeStudent: false, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/quiz-attempts?${queryParams}`).then((res) => res.data)
}

export function showQuizAttempt(id: number) {
  return axios.get(`${API_URL}/quiz-attempts/${id}`).then((res) => res.data)
}

export function createQuizAttempt(data: Entity.QuizAttempt) {
  return axios.post(`${API_URL}/quiz-attempts`, data)
}

export function updateQuizAttempt(id: number, data: Partial<Entity.QuizAttempt>) {
  return axios.put(`${API_URL}/quiz-attempts/${id}`, data)
}

export function deleteQuizAttempt(id: number) {
  return axios.delete(`${API_URL}/quiz-attempts/${id}`)
}
