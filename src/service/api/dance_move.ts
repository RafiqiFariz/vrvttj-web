import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDanceMoveList(params: {
  page?: number,
  paginate?: boolean,
  includeDance?: boolean,
  includeDancePart?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = {
    page: 1, paginate: true, includeDance: true,
    includeDancePart: true, pageSize: 20
  }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-moves?${queryParams}`).then((res) => res.data)
}

export function showDanceMove(id: number) {
  return axios.get(`${API_URL}/dance-moves/${id}`).then((res) => res.data)
}

export function createDanceMove(data: Entity.DanceMove) {
  return axios.post(`${API_URL}/dance-moves`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateDanceMove(id: number, data: Partial<Entity.DanceMove>) {
  return axios.post(`${API_URL}/dance-moves/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteDanceMove(id: number) {
  return axios.delete(`${API_URL}/dance-moves/${id}`)
}
