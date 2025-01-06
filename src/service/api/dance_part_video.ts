import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchDancePartVideoList(params: {
  dancePartId?: number,
  page?: number,
  paginate?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/dance-parts/${params.dancePartId}/videos?${queryParams}`).then((res) => res.data)
}

export function createDancePartVideo(dancePartId: number, data: Entity.DancePartVideo) {
  return axios.post(`${API_URL}/dance-parts/${dancePartId}/videos`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function updateDancePartVideo(dancePartId: number, id: number, data: Partial<Entity.DancePartVideo>) {
  return axios.post(`${API_URL}/dance-parts/${dancePartId}/videos/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function deleteDancePartVideo(dancePartId: number, id: number) {
  return axios.delete(`${API_URL}/dance-parts/${dancePartId}/videos/${id}`)
}
