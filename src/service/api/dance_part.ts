import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDancePartList(params: {
  page?: number,
  paginate?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-parts?${queryParams}`).then((res) => res.data)
}

export function showDancePart(id: number) {
  return axios.get(`${API_URL}/dance-parts/${id}`).then((res) => res.data)
}

export function createDancePart(data: Entity.DancePart) {
  return axios.post(`${API_URL}/dance-parts`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function updateDancePart(id: number, data: Partial<Entity.DancePart>) {
  return axios.post(`${API_URL}/dance-parts/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function deleteDancePart(id: number) {
  return axios.delete(`${API_URL}/dance-parts/${id}`)
}
