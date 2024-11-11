import axios from 'axios'
import qs from 'qs'
import { API_URL } from '..'

export async function fetchUserList(params: {
  page?: number,
  paginate?: boolean,
  includeRole?: boolean,
  pageSize?: number,
} = {}) {
  const defaultParams = { page: 1, paginate: true, includeRole: true, pageSize: 20 }
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
