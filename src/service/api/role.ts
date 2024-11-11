import axios from 'axios'
import { API_URL } from '..'
import qs from 'qs'

export function fetchRoleList(params: {
  page?: number,
  paginate?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, pageSize: 20 }
  const queryParams = qs.stringify({ ...defaultParams, ...params })

  return axios.get(`${API_URL}/roles?${queryParams}`).then((res) => res.data)
}

export function createRole(data: Entity.Role) {
  return axios.post(`${API_URL}/roles`, data)
}

export function updateRole(id: string, data: Partial<Entity.Role>) {
  return axios.put(`${API_URL}/roles/${id}`, data)
}

export function deleteRole(id: number) {
  return axios.delete(`${API_URL}/roles/${id}`)
}
