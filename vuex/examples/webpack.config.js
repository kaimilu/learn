const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    // 嵌入到源文件中
    devtool: 'inline-source-map',
    /**
     *  fs.readdirSync： 返回一不包括'.'和'..'的文件名的数组
     *      http://nodejs.cn/api/fs.html#fs_fs_readdirsync_path_options
     *  Array.prototype.reduce(): 方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值
     *      https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
     */

    /**
     *  // string | object | array
     * webpack: 入口 这里应用程序开始执行
     */
    entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
        const fullDir = path.join(__dirname, dir)
        const entry = path.join(fullDir, 'app.js')

        if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
            entries[dir] = ['webpack-hot-middleware/client', entry]
        }

        return entries
    }, {}),

    /**
     *   webpack 如何输出结果的相关选项
     */
    output: {
        // 所有输出文件的目标路径
        path: path.join(__dirname, '__build__'),
        // 「入口分块(entry chunk)」的文件名模板（出口分块？）
        filename: '[name].js',
        // 「附加分块(additional chunk)」的文件名模板
        chunkFilename: '[id].chunk.js',
        // 输出解析文件的目录，url 相对于 HTML 页面
        publicPath: '/__build__/'
    },

    // 关于模块配置
    module: {
        // 模块规则（配置 loader、解析器等选项）
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },

    // 解析模块请求的选项
    resolve: {

        // 模块别名列表
        // alias: {
        //     vuex: path.resolve(__dirname, '../src/index.esm.js')
        // }
    },

    // 构建优化插件
    plugins: [
        // 有助于提取这些依赖到共享的 bundle 中，来避免重复打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'shared.js'
        }),

        // 编译时(compile time)插件
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}