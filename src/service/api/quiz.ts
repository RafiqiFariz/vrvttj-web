import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchQuizList(params: {
  page?: number,
  paginate?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/quizzes?${queryParams}`).then((res) => res.data)
}

export function showQuiz(id: number) {
  return axios.get(`${API_URL}/quizzes/${id}`).then((res) => res.data)
}

export function createQuiz(data: Entity.Quiz) {
  return axios.post(`${API_URL}/quizzes`, data)
}

export function updateQuiz(id: number, data: Partial<Entity.Quiz>) {
  return axios.put(`${API_URL}/quizzes/${id}`, data)
}

export function deleteQuiz(id: number) {
  return axios.delete(`${API_URL}/quizzes/${id}`)
}
