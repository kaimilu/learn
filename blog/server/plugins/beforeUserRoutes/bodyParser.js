const bodyParser = require('koa-bodyparser')

// 返回一个具有beforeUseRoutes方法的对象，传APP（Koa） 对象
module.exports = class {
    async beforeUseRoutes({
        app
    }) {
        app.use(bodyParser())
    }
}