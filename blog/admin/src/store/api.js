import request from 'axios'

// const root = `/proxyPrefix/api`

const root = `/proxyPrefix/api`
const store = {}

export default store

store.request = request

store.login = (conditions) => {
  return request.post(`/proxyPrefix/admin/login`, conditions)
}

store.logout = (conditions) => {
  return request.post(`/proxyPrefix/admin/logout`, conditions)
}