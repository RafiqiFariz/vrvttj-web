import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDanceClothList(params: {
  page?: number,
  paginate?: boolean,
  includeDance?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = {
    page: 1, paginate: true, includeDance: true, pageSize: 20
  }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-clothes?${queryParams}`).then((res) => res.data)
}

export function showDanceCloth(id: number) {
  return axios.get(`${API_URL}/dance-clothes/${id}`).then((res) => res.data)
}

export function createDanceCloth(data: Entity.DanceClothes) {
  return axios.post(`${API_URL}/dance-clothes`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function updateDanceCloth(id: number, data: Partial<Entity.DanceClothes>) {
  return axios.post(`${API_URL}/dance-clothes/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteDanceCloth(id: number) {
  return axios.delete(`${API_URL}/dance-clothes/${id}`)
}
