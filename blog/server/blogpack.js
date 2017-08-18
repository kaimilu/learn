// blogpack 类
class blogpack {
    // 构造器
    constructor(options) {
        this.config = options.config || {}
        this.plugins = options.plugins || {}
        this.models = options.models
        this.redis = options.redis
    }

    // 异步方法 beforeUserRoutes
    async beforeUseRoutes(...args) {
        // 遍历插件中所具有beforeUseRoutes方法的插件,并执行
        for (let plugin of this.plugins) {
            plugin.beforeUseRoutes && await plugin.beforeUseRoutes(...args)
        }
    }

    async getMiddlewareRoutes(...args) {
        // 所有具有mountingRoute 方法的plug: 
        const plugins = this.plugins.filter(plugin => plugin['mountingRoute'])
        const result = []
            // 循环执行mountingRoute方法返回的结果push到result数组中去
        for (const plugin of plugins) {
            const routeObj = await plugin.mountingRoute()
            result.push(Object.assign({}, routeObj, {
                needBeforeRoutes: routeObj.needBeforeRoutes || false,
                needAfterRoutes: routeObj.needAfterRoutes || false
            }))
        }
        return result
    }

    getBeforeRestfulRoutes() {
        return this.plugins
            .filter(plugin => plugin['beforeRestful'])
            .map(plugin => plugin['beforeRestful'])
    }

}

module.exports = blogpack