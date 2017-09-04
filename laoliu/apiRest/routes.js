module.exports = (router, modelName, actions, prefix) => {
  const modelUrl = `${prefix}/${modelName}`

  router.get(modelUrl, actions.findAll)

}