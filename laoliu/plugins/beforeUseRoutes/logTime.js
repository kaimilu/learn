const log = require('../../utils/log')

module.exports = class {
  async beforeUseRoutes({ app}) {
    app.use(async(ctx, next)　=> {
      const start = new Date()
      await next() 
      const ms = new Date() - start
      log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${ms}ms`)
    })
  }
}