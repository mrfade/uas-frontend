import axios from 'axios'
import TokenService from './token.service'
import store from '@/store'
import router from '@/router'
import config from '@/config'

axios.defaults.baseURL = config.api_url

const ApiService = {
  _401interceptor: null,

  setHeader() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource, options) {
    return axios.get(resource, options)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  customRequest(data) {
    return axios(data)
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      response => {
        return response
      },
      async error => {
        if (error.request.status === 401) {
          if (error.response.data.code === 'token_expired') {
            TokenService.removeToken()
            ApiService.removeHeader()
            store.dispatch('notification/error', { message: i18n.t('session_expired'), position: 'top-center' })
            if (router.currentRoute.name !== 'home') router.push({ name: 'home' })
          } else if (error.response.data.code === 'phone_not_verified') {
            if (router.currentRoute.name !== 'login') router.push({ name: 'login', query: { phoneVerification: true } })
          } else if (error.response.data.code === 'invalid_jwt_token') {
            TokenService.removeToken()
            ApiService.removeHeader()
            store.dispatch('notification/error', { message: i18n.t('unexpected_error'), position: 'top-center' })
            if (router.currentRoute.name !== 'home') router.push({ name: 'home' })
          }
        }
        // else console.error(error)

        // If error was not 401 just reject as is
        throw error
      }
    )
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
  }
}

if (TokenService.getToken()) {
  ApiService.setHeader()
}

export default ApiService