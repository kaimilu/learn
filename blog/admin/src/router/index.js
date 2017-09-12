import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// import Hello from '@/components/Hello'
import createListView from '../components/Views/createListView'
import createEditView from '../components/views/CreateEditView'
import createMarkdownView from '../components/views/CreateMarkdownView'

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
      path: 'list',
      name: 'postList',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'postList',
          component: createListView({
            name: 'post',
            model: 'post',
            isButtonFixed: true,
            items: [
              {
                prop: 'title',
                label: '标题',
                width: 300
              },
              {
                prop: 'pathName',
                label: '路径',
                width: 300
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1
              },
              sort: {
                createdAt: -1
              }
            }
          })
        },
        {
          path: 'create/:id?',
          name: 'postCreate',
          component: createMarkdownView({
            name: 'post',
            model: 'post',
            items: [
              {
                prop: 'title',
                label: '标题',
                type: 'input',
                default: '',
                width: 250
              },
              {
                prop: 'pathName',
                label: '路径',
                type: 'input',
                default: '',
                width: 250,
                description: '作为文章的唯一标志在前端路径中显示，例如test-article'
              },
              {
                prop: 'markdownContent',
                label: '内容',
                type: 'markdown',
                default: '',
                width: 170,
                subProp: 'markdownToc'
              },
              {
                type: 'split'
              },
              {
                prop: 'createAt',
                label: '创建日期',
                type: 'data-picker',
                default: '',
                width: 170
              },
              {
                prop: 'updateAt',
                label: '修改日期',
                type: 'data-picker',
                default: '',
                width: 170
              },
              {
                prop: 'tags',
                label: '标签',
                type: 'select',
                default: [],
                width: 170
              },
              {
                prop: 'category',
                label: '分类',
                type: 'radio',
                default: '',
                width: 170
              },
              {
                prop: 'isPublic',
                label: '是否公开',
                type: 'switch',
                default: true,
                width: 170
              },
              {
                prop: 'allowComment',
                label: '允许评论',
                type: 'switch',
                default: true,
                width: 170
              }
            ],
            query: {
              conditions: {
                type: 'post'
              },
              select: {
                title: 1,
                pathName: 1,
                tags: 1,
                category: 1,
                isPublic: 1,
                allowComment: 1,
                updatedAt: 1,
                createdAt: 1,
                markdownContent: 1,
                type: 1,
                markdownToc: 1
              }
            }
          })
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
