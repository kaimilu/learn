import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    siteInfo: {},
    user: {}
  },

  actions: {

    FETCH_OPTIONS: ({ commit, state }) => {
      return api.fetchList('option', {}).then(optionArr => {
        // reduce() 方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值。
        let obj = optionArr.reduce((prev, curr) => {
          prev[curr.key] = curr
          return prev
        }, {})

        // prev = {
        //   "numPerPage": {
        //     "_id": ObjectId("5940f1e729326f47cc2a8353"),
        //     "key": "numPerPage",
        //     "value": "",
        //     "__v": 0
        //   },
        //   {...}
        // }
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
