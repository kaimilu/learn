const generateRoutes = require('./routes')
const generateActions = require('./actions')

module.exports = (router, model, prefix) => {
  const actions = generateActions(model)
  generateRoutes(router, model.modelName, actions, prefix)
}