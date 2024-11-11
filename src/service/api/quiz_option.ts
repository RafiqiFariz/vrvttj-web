import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchQuizOptionList(params: {
  page?: number,
  paginate?: boolean,
  includeQuizQuestion?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, includeQuizQuestion: false, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/quiz-options?${queryParams}`).then((res) => res.data)
}

export function showQuizOption(id: number) {
  return axios.get(`${API_URL}/quiz-options/${id}`).then((res) => res.data)
}

export function createQuizOption(data: Entity.QuizOption) {
  return axios.post(`${API_URL}/quiz-options`, data)
}

export function updateQuizOption(id: number, data: Partial<Entity.QuizOption>) {
  return axios.put(`${API_URL}/quiz-options/${id}`, data)
}

export function deleteQuizOption(id: number) {
  return axios.delete(`${API_URL}/quiz-options/${id}`)
}
