// 开发环境配制文件
const base = require('./blogpack.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const config = Object.assign({}, base)

// const RateLimitPlugin = require(`${useRoutesPrefix}/ratelimit`)
const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)

const CheckAuthPlugin = require('../plugins/beforeRestful/checkAuth')

// 
config.plugins.push(
    // beforeUseRoutes
    // new RateLimitPlugin(),
    new BodyParserPlugin(),
    new LogTimePlugin(),
    new RestcPlugin(),

    // beforeRestful
    new CheckAuthPlugin()
)

module.exports = config