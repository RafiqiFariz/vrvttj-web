import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchQuizQuestionList(params: {
  page?: number,
  paginate?: boolean,
  includeQuiz?: boolean,
  includeOptions?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, includeQuiz: false, includeOptions: false, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/quiz-questions?${queryParams}`).then((res) => res.data)
}

export function showQuizQuestion(id: number) {
  return axios.get(`${API_URL}/quiz-questions/${id}`).then((res) => res.data)
}

export function createQuizQuestion(data: Entity.QuizQuestion) {
  return axios.post(`${API_URL}/quiz-questions`, data)
}

export function updateQuizQuestion(id: number, data: Partial<Entity.QuizQuestion>) {
  return axios.put(`${API_URL}/quiz-questions/${id}`, data)
}

export function deleteQuizQuestion(id: number) {
  return axios.delete(`${API_URL}/quiz-questions/${id}`)
}
