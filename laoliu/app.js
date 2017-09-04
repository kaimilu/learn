global.Promise = require('bluebird')

const log = require('./utils/log')
const Koa = require('koa')
const cors = require('koa2-cors');
const koaRouter = require('koa-router')
const models = require('./apiModel/apiModel')
const apiRest = require('./apiRest')
const config = require('./conf/config')
const configName = process.env.NODE_ENV === '"development"' ? 'dev' : 'prod'
const laoliuConfig = require(`./build/laoliu.${configName}.config`)
laoliuConfig.models = models

const LaoLiu = require('./laoliu')
const laoliu = global.laoliu = new LaoLiu(laoliuConfig)

const app = new Koa()
const router = koaRouter()
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

module.exports = (async () => {
  try {
    await laoliu.beforeUseRoutes({
      config: laoliu.config,
      app,
      router,
      models
    })

    Object.keys(models).map(name => models[name]).forEach(model => {
      apiRest(router, model, '/api')
    })

    app.use(router.routes())



    app.listen(config.serverPort, () => {
      log.info(`Koa2 is running at ${config.serverPort}`)
    })

  } catch (err) {
    log.error(err)
  }
})()