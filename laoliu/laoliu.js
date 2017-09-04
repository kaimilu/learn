class laoliu {
  constructor(options) {
    this.config = options.config || {}
    this.plugins = options.plugins || {}
    this.models = options.models
  }

  async beforeUseRoutes(...args) {
    for (let plugin of this.plugins) {
      plugin.beforeUseRoutes && await plugin.beforeUseRoutes(...args)
    }
  }



}

module.exports = laoliu