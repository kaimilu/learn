import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },

  actions: {

  },
  mutations: {
    SET_USER: (state, { user }) => {
      Vue.set(state, 'user', user)
    }
  },

  getters: {

  }
})

export default store