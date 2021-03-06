// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store/index'
// import VueProgressBar from 'vue-progressbar'

sync(store, router)

import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
Vue.use(Element)

import App from './App'

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
