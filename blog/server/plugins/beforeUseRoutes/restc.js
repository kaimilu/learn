/**
 * https://elemefe.github.io/restc/intro/
 * restc 用于可视化展示请求，调试 RESTful 接口
 */
const restc = require('restc')

module.exports = class {
    async beforeUseRoutes({ app }) {
        app.use(restc.koa2())
    }
}