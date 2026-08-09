import { createStore } from 'vuex'
import auth from './modules/auth'

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  modules: {
    auth
  }
})

export default store