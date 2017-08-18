// 开发环境配制文件
const base = require('./blogpack.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const serverStartPrefix = '../plugins/beforeServerStart'
const env = process.env

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
const config = Object.assign({}, base)

const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RateLimitPlugin = require(`${useRoutesPrefix}/ratelimit`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)

// 
config.plugins.push(
    // beforeUseRoutes
    new BodyParserPlugin(),
    new LogTimePlugin(),
    new RateLimitPlugin({
        duration: 60000,
        errorMessage: '限时出错，老苏提示！',
        id: (ctx) => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 100
    }),
    new RestcPlugin(),

)

module.exports = config