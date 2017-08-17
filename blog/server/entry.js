require('babel-register')({
    plugins: ['transform-async-to-generator'],
    // Ignore can also be specified as a function
    ignore: function(filename) {
        if (filename.includes('koa-ratelimit')) return false
        if (filename.includes('node_modules')) return true
        return false
    }
})

require('./app.js')
console.log(global.Promise)