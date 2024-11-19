import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchQuizResultList(params: {
  page?: number,
  paginate?: boolean,
  includeQuiz?: boolean,
  includeStudent?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, includeStudent: false, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/quiz-results?${queryParams}`).then((res) => res.data)
}

export function showQuizResult(id: number) {
  return axios.get(`${API_URL}/quiz-results/${id}`).then((res) => res.data)
}

export function createQuizResult(data: Entity.QuizResult) {
  return axios.post(`${API_URL}/quiz-results`, data)
}

export function updateQuizResult(id: number, data: Partial<Entity.QuizResult>) {
  return axios.put(`${API_URL}/quiz-results/${id}`, data)
}

export function deleteQuizResult(id: number) {
  return axios.delete(`${API_URL}/quiz-results/${id}`)
}
