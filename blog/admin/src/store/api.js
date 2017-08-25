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

/**
 * @param model 模型
 * @param query 请求参数
 */
store.fetchList = (model, query) => {
  let target = `${root}/${model}`
  return request.get(target, { params: query }).then((response) => {
    return response.data
  })
}
