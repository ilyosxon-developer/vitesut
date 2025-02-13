import axios from 'axios'
import { storage } from '@utils'
import { appConfig } from '@config'

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

const token = storage.get(appConfig.storage.ACCESS_TOKEN)
if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`

export const setAuthorization = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

axios.interceptors.response.use(
  (response) => (response.data ? response.data : response),
  (error) => Promise.reject(error),
)

class APIClient {
  get = (url, params, config) => axios.get(url, { params }, { ...config })

  create = (url, data, config) => axios.post(url, data, { ...config })

  update = (url, data, config) => axios.patch(url, data, { ...config })

  put = (url, data, config) => axios.put(url, data, { ...config })

  delete = (url, config) => axios.delete(url, { ...config })
}

export const httpRequest = new APIClient()
