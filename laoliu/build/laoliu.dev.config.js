const base = require('./laoliu.base.config')
const useRoutesPrefix = '../plugins/beforeUseRoutes'
const env = process.env

const config = Object.assign({}, base)

const BodyParserPlugin = require(`${useRoutesPrefix}/bodyParser`)
const LogTimePlugin = require(`${useRoutesPrefix}/logTime`)
const RestcPlugin = require(`${useRoutesPrefix}/restc`)


config.plugins.push(
  new BodyParserPlugin(),
  new LogTimePlugin(),
  new RestcPlugin()
)

module.exports = config