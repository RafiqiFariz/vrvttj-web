import axios from 'axios'

interface Ilogin {
  email: string
  password: string
  remember: boolean
}

export async function fetchLogin(data: Ilogin) {
  const csrfCookie = await axios.get('/sanctum/csrf-cookie')

  if (csrfCookie.status !== 204) return

  await axios.post('/login', data)
  return await axios.get('/user')
}

export async function getAuthenticatedUser() {
  return await axios.get('/user')
}

// export function fetchUpdateToken(data: any) {
//   const method = request.Post<Service.ResponseResult<Api.Login.Info>>('/updateToken', data)
//   method.meta = {
//     authRole: 'refreshToken',
//   }
//   return method
// }

// export function fetchUserRoutes(params: { id: number }) {
//   return request.Get<Service.ResponseResult<AppRoute.RowRoute[]>>('/getUserRoutes', { params })
// }
