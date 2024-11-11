import { API_URL } from '..'
import { request } from '../http'
import axios from 'axios'

export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

export function fetchDictList(code?: string) {
  const params = { code }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list', { params })
}

export function uploadImage(data: FormData) {
  return axios.post(`${API_URL}/upload`, data)
}
