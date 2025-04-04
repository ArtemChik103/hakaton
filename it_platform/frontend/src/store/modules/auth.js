import axios from 'axios'

// Получение токена из localStorage
const token = localStorage.getItem('token')

const state = {
  token: token || null,
  user: null,
  loading: false,
  error: null
}

const getters = {
  isAuthenticated: state => !!state.token,
  currentUser: state => state.user,
  authLoading: state => state.loading,
  authError: state => state.error
}

const mutations = {
  AUTH_START(state) {
    state.loading = true
    state.error = null
  },
  AUTH_SUCCESS(state, { token, user }) {
    state.token = token
    state.user = user
    state.loading = false
    state.error = null
  },
  AUTH_ERROR(state, error) {
    state.loading = false
    state.error = error
  },
  SET_USER(state, user) {
    state.user = user
  },
  LOGOUT(state) {
    state.token = null
    state.user = null
  }
}

const actions = {
  // Регистрация пользователя
  async register({ commit, dispatch }, userData) {
    commit('AUTH_START')
    try {
      const response = await axios.post('/api/users/register/', userData)
      const { token, user } = response.data
      
      // Сохраняем токен в localStorage
      localStorage.setItem('token', token)
      
      // Устанавливаем токен для будущих запросов
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
      
      commit('AUTH_SUCCESS', { token, user })
      return response
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      throw error
    }
  },
  
  // Аутентификация пользователя
  async login({ commit }, credentials) {
    commit('AUTH_START')
    try {
      const response = await axios.post('/api/users/login/', credentials)
      const { token, user } = response.data
      
      // Сохраняем токен в localStorage
      localStorage.setItem('token', token)
      
      // Устанавливаем токен для будущих запросов
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
      
      commit('AUTH_SUCCESS', { token, user })
      return response
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      throw error
    }
  },
  
  // Аутентификация через Yandex OAuth
  async loginWithYandex({ commit }) {
    // Здесь будет редирект на Yandex OAuth
    window.location.href = '/auth/yandex-oauth2/login/'
  },
  
  // Получение данных пользователя
  async getUser({ commit, state }) {
    if (!state.token) return
    
    commit('AUTH_START')
    try {
      const response = await axios.get('/api/users/profile/')
      const user = response.data
      commit('SET_USER', user)
      return user
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      
      // Если токен недействителен, выходим
      if (error.response && error.response.status === 401) {
        dispatch('logout')
      }
      
      throw error
    }
  },
  
  // Обновление профиля
  async updateProfile({ commit }, profileData) {
    commit('AUTH_START')
    try {
      const response = await axios.put('/api/users/profile/', profileData)
      const user = response.data
      commit('SET_USER', user)
      return user
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      throw error
    }
  },
  
  // Отправка SMS для верификации
  async sendVerificationSms({ commit }) {
    commit('AUTH_START')
    try {
      const response = await axios.post('/api/users/send-sms/')
      commit('AUTH_SUCCESS', { token: state.token, user: state.user })
      return response.data
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      throw error
    }
  },
  
  // Проверка SMS-кода
  async verifyPhone({ commit }, code) {
    commit('AUTH_START')
    try {
      const response = await axios.post('/api/users/verify-phone/', { code })
      const user = response.data.user
      commit('SET_USER', user)
      return user
    } catch (error) {
      commit('AUTH_ERROR', error.response ? error.response.data : error.message)
      throw error
    }
  },
  
  // Выход из системы
  logout({ commit }) {
    // Удаляем токен из localStorage
    localStorage.removeItem('token')
    
    // Удаляем заголовок авторизации
    delete axios.defaults.headers.common['Authorization']
    
    // Сбрасываем состояние хранилища
    commit('LOGOUT')
    
    // Выход через API (бэкенд)
    return axios.post('/api/users/logout/')
      .catch(error => console.error('Ошибка при выходе:', error))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
} 