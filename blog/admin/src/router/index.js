import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from '@/components/Hello'

import Login from '@/components/pages/Login'
import Logout from '@/components/pages/Logout'

import Main from '@/components/Main'
import Dashboard from '@/components/pages/Dashboard'

// 定义路由
export default new Router({
  mode: 'history', // History 模式
  // 滚动行为
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      components: {
        default: Login
      }
    },
    {
      path: '/admin/logout',
      name: 'logout',
      components: {
        default: Logout
      }
    },
    {
      path: '/dashboard',
      component: Main,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/',
      redirect: '/admin/login'
    }
  ]
})
