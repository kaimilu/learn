// 开发环境配制文件
const base = require('./blogpack.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const config = Object.assign({}, base)

config.plugins.push()

module.exports = config