const redis = require('../../model/redis')
const tokenService = require('../../service/token')

module.exports = class {
    async beforeRestful(ctx, next) {
        const isGettingUser = ctx.url.startsWith('/api/user')
        const isGettingAdmin = ctx.url.startsWith('/admin/')
        const isNotGet = ctx.url.startsWith('/api/') && ctx.method !== 'GET'
        if (!isGettingAdmin && !isGettingUser && !isNotGet) {
            return next()
        }

        const headers = ctx.request.headers
        let token

        try {
            token = headers['authorization']
        } catch (err) {
            return ctx.body = {
                status: 'fail',
                description: err
            }
        }

        if (!token) {
            return ctx.body = {
                status: 'fail',
                description: 'Token not found'
            }
        }

        // 校验 token 是否有效
        const result = tokenService.verifyToken(token)
        if (result === false) {
            return ctx.body = {
                status: 'fail',
                description: 'Token verify failed'
            }
        }

        // 异步获取 redis token 值
        let reply = await redis.getAsync('token')

        // 缓存token 与 请求报文头的 token 就否相同
        if (reply === token) {
            return next()
        } else {
            return ctx.body = {
                status: 'fail',
                description: 'Token invalid'
            }
        }
    }
}