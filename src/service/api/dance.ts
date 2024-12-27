import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDanceList(params: {
  page?: number,
  paginate?: boolean,
  includeDanceType?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20, includeDanceType: true }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dances?${queryParams}`).then((res) => res.data)
}

export function showDance(id: number) {
  return axios.get(`${API_URL}/dances/${id}`).then((res) => res.data)
}

export function createDance(data: Entity.Dance) {
  return axios.post(`${API_URL}/dances`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function updateDance(id: number, data: Partial<Entity.Dance>) {
  return axios.post(`${API_URL}/dances/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function deleteDance(id: number) {
  return axios.delete(`${API_URL}/dances/${id}`)
}
