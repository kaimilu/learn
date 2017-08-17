// blogpack 类
class blogpack {
    // 构造器
    constructor(options) {
        this.config = options.config || {}
        this.plugins = options.plugins || {}
        this.models = options.models
        this.redis = option.redis
    }

    // 异步方法 beforeUserRoutes
    async beforeUseRoutes(...args) {
        for (let plugin of this.plugins) {
            plugin.beforeUseRoutes && await plugin.beforeUseRoutes(...args)
        }
    }

}

module.exports = blogpack