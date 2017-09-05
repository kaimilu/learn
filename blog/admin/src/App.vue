<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './store/api'
import {getChineseDesc} from './utils/error'

export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    siteInfo() {
      return this.$store.state.siteInfo
    }
  },
  // 在挂载开始之前被调用
  beforeMount() {
    this.$store.dispatch('FETCH_OPTIONS').then(() => {
      if (this.siteInfo['title'] && typeof document !== 'undefined') {
        document.title = this.siteInfo['title'].value
      }
    })

    const { request } = api

    /**
    *  https://www.npmjs.com/package/axios
    *  拦截请求
     */
    request.interceptors.request.use((config) => {
      const token = window.localStorage.getItem('token')

      if (config.method === 'get' && config.url.indexOf('/proxyPrefix/api/user') === -1) {
        return config
      }

      if (token !== null && typeof token !== 'undefined') {
        config.headers['authorization'] = token
      }
      return config
    }, (error) => Promise.reject(error))

    // 拦截响应
    request.interceptors.response.use((response) => {
      if (this.$store.state.route.name === 'logout') {
        return response
      }
      if (response.data && response.data.status && response.data.status === 'fail') {
        let desc = getChineseDesc(response.data.description)
        this.$notify.error(desc)
        return Promise.reject(desc)
      }
      return response
    }, (error) => Promise.reject(error))
  }
}
</script>


<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;

  #app {
    height: 100%;
  }
}
</style>
