import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchStudentAnswerList(params: {
  page?: number,
  paginate?: boolean,
  includeQuizAttempt?: boolean,
  includeQuizQuestion?: boolean,
  includeQuizOption?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = {
    page: 1,
    includeQuizAttempt: false,
    includeQuizQuestion: false,
    includeQuizOption: false,
    paginate: true,
    pageSize: 20
  }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/student-answers?${queryParams}`).then((res) => res.data)
}

export function showStudentAnswer(id: number) {
  return axios.get(`${API_URL}/student-answers/${id}`).then((res) => res.data)
}

export function createStudentAnswer(data: Entity.StudentAnswer) {
  return axios.post(`${API_URL}/student-answers`, data)
}

export function updateStudentAnswer(id: number, data: Partial<Entity.StudentAnswer>) {
  return axios.put(`${API_URL}/student-answers/${id}`, data)
}

export function deleteStudentAnswer(id: number) {
  return axios.delete(`${API_URL}/student-answers/${id}`)
}
