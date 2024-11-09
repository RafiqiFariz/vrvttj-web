import { request } from '../http'
import axios from 'axios'
import qs from 'qs'

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1`

export function fetchAllRoutes() {
  return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes')
}

export async function fetchUserList(params: {
  paginate?: boolean,
  includeRole?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { paginate: true, includeRole: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/users?${queryParams}`).then((res) => res.data)
}

export function createUser(data: Entity.User) {
  return axios.post(`${API_URL}/users`, data)
}

export function updateUser(id: string, data: Partial<Entity.User>) {
  return axios.put(`${API_URL}/users/${id}`, data)
}

export function deleteUser(id: number) {
  return axios.delete(`${API_URL}/users/${id}`)
}

export function fetchRoleList() {
  return axios.get(`${API_URL}/roles`).then((res) => res.data)
}

export function fetchDictList(code?: string) {
  const params = { code }
  return request.Get<Service.ResponseResult<Entity.Dict[]>>('/dict/list', { params })
}

export function uploadImage(data: FormData) {
  return axios.post(`${API_URL}/api/v1/upload`, data)
}
