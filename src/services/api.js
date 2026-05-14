import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8001',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor request — ajoute le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor response — gère l'expiration du token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          const res = await axios.post(
            'http://127.0.0.1:8001/api/users/refresh-token',
            { refresh_token: refreshToken }
          )
          const newToken = res.data.access_token
          localStorage.setItem('access_token', newToken)
          original.headers.Authorization = `Bearer ${newToken}`
          return api(original)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      } else {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api