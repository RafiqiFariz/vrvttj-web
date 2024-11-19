import axios from 'axios'
import { API_URL } from '..'

export function fetchDashboardData() {
  return axios.get(`${API_URL}/dashboard`).then((res) => res.data)
}
