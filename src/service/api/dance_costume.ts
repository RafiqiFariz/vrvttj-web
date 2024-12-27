import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDanceCostumeList(params: {
  page?: number,
  paginate?: boolean,
  includeDance?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = {
    page: 1, paginate: true, includeDance: true, pageSize: 20
  }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-costumes?${queryParams}`).then((res) => res.data)
}

export function showDanceCostume(id: number) {
  return axios.get(`${API_URL}/dance-costumes/${id}`).then((res) => res.data)
}

export function createDanceCostume(data: Entity.DanceCostume) {
  return axios.post(`${API_URL}/dance-costumes`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateDanceCostume(id: number, data: Partial<Entity.DanceCostume>) {
  return axios.post(`${API_URL}/dance-costumes/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteDanceCostume(id: number) {
  return axios.delete(`${API_URL}/dance-costumes/${id}`)
}
