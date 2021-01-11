import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,

    login: false,
    user: {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      tc_number: '',
      phone: ''
    }
  },
  mutations: {
    updateMe(state, me) {
      state.user.id = me.id
      state.user.first_name = me.first_name
      state.user.last_name = me.last_name
      state.user.email = me.email
      state.user.tc_number = me.tc_number
      state.user.phone = me.phone

      state.login = true
    },

    logout(state) {
      state.user.id = 0
      state.user.first_name = ''
      state.user.last_name = ''
      state.user.email = ''
      state.user.tc_number = ''
      state.user.phone = ''

      state.login = false
    },

    loading(state, val) {
      state.loading = val
    }
  }
})

export default store