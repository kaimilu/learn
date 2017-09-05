import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    user: {},
    curr: {}
  },

  actions: {

    FETCH_OPTIONS: ({ commit, state }) => {
      return api.fetchList('option', {}).then(optionArr => {
        // reduce() 方法对累加器和数组中的每个元素 (从左到右)应用一个函数，
        // 将其减少为单个值。
        let obj = optionArr.reduce((prev, curr) => {
          prev[curr.key] = curr
          return prev
        }, {})
        commit('SET_OPTIONS', { obj })
      })
    }
  },
  mutations: {
    SET_USER: (state, { user }) => {
      Vue.set(state, 'user', user)
    },

    // 当需要在对象上添加新属性时
    SET_OPTIONS: (state, { obj }) => {
      Vue.set(state, 'siteInfo', obj)
    }

  },

  getters: {

  }
})

export default store
