import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers'
import router from '@/router'

interface State {
  user: string
  token: string
}

// const baseUrl = `${import.meta.env.VITE_API_URL}/v1/login`;
const baseAPI = 'https://9i07df2ji0.execute-api.us-east-2.amazonaws.com'
const loginUrl = `${baseAPI}/v1/login`
const logoutUrl = `${baseAPI}/v1/logout`
const meUrl = `${baseAPI}/v1/users/me`

export const loginStore = defineStore('login', {
  state: (): State => ({
    user: '',
    token: ''
  }),
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(token: any) {
      this.token = token
    },
    async logout() {
      const response = await fetchWrapper.post(`${logoutUrl}`, {})
      this.user = ''
      this.token = ''
    },
    async login(username: any, password: any) {
      const response = await fetchWrapper.post(`${loginUrl}`, { username, password })
      this.setUser(username)
      this.setToken(response.session_token) // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(response))
      console.log(response)
      router.replace({ name: 'home' })
      return response
    },
    authHeader() {
      if (this.isLoggedIn) {
        return { Authorization: `Bearer ${this.token}` }
      } else {
        return {}
      }
    },
    async getMe() {
      const response = await fetchWrapper.get(`${meUrl}`, undefined)
      console.log(response)
      return response
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    },
    getUser(state) {
      return state.user
    }
  }
})
