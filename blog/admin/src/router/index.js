import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from '@/components/Hello'
import createEditView from '../components/views/CreateEditView'

import Main from '@/components/Main'
import Login from '@/components/pages/Login'
import Logout from '@/components/pages/Logout'
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
      path: '/user',
      name: 'user',
      component: Main,
      children: [
        {
          path: 'edit',
          name: 'userEdit',
          component: createEditView({ // 动态创建修改用户信息组件
            name: 'user',
            model: 'user',
            isPlain: true,
            items: [
              {
                prop: 'name',
                label: '账号',
                default: '',
                width: 250
              },
              {
                prop: 'password',
                label: '密码',
                default: '',
                width: 170
              },
              {
                prop: 'displayName',
                label: '昵称',
                default: '',
                width: 170,
                description: '在后台管理的顶部导航栏中显示'
              },
              {
                prop: 'email',
                label: '邮箱',
                default: '',
                width: 170,
                description: '在文章被回复时博客需要通知的目标邮箱，空则不通知'
              }
            ],
            query: {}
          })
        }
      ]
    },
    {
      path: '/',
      redirect: '/admin/login'
    }
  ]
})
