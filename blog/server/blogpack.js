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

    /**
     * 
     * @param {any} args 
     * @returns 返回一个数组对象 item: 
     * @memberof blogpack
     */
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
        /**
         * Array.prototype.filter() 
         *  方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
         * Array.prototype.map()
         *  方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
         */
    getBeforeRestfulRoutes() {
        return this.plugins
            .filter(plugin => plugin['beforeRestful'])
            .map(plugin => plugin['beforeRestful'])
            // this.plugins.map(function(plugin) {
            //     plugin['beforeRestful']
            // })
    }

    getAfterRestfulRoutes() {
        return this.plugins
            .filter(plugin => plugin['afterRestful'])
            .map(plugin => plugin['afterRestful'])
    }

    getBeforeServerStartFuncs() {
        return this.plugins
            .filter(plugin => plugin['beforeServerStart'])
            .map(plugin => plugin['beforeServerStart'])
    }
}

module.exports = blogpack