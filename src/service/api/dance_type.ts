import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDanceTypeList(params: {
  page?: number,
  paginate?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-types?${queryParams}`).then((res) => res.data)
}

export function showDanceType(id: number) {
  return axios.get(`${API_URL}/dance-types/${id}`).then((res) => res.data)
}

export function createDanceType(data: Entity.DanceType) {
  return axios.post(`${API_URL}/dance-types`, data)
}

export function updateDanceType(id: number, data: Partial<Entity.DanceType>) {
  return axios.put(`${API_URL}/dance-types/${id}`, data)
}

export function deleteDanceType(id: number) {
  return axios.delete(`${API_URL}/dance-types/${id}`)
}
