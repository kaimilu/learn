import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from '@/components/Hello'

import Login from '../components/pages/Login'

// 定义路由
export default new Router({
  mode: 'history', // History 模式
  // 滚动行为
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [{
    path: '/admin/login',
    name: 'login',
    components: {
      default: Login
    }
  }, {
    path: '/',
    redirect: '/admin/login'
  }]
})
