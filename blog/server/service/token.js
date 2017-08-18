const jwt = require('jsonwebtoken')
const config = require('../conf/config')

// token 密钥
let secret = config.tokenSecret

// token 有效时间
let expiresIn = config.tokenExpiresIn

module.exports = {
    createToken(userinfo) {
        let token = jwt.sign(userinfo, secret, { expiresIn })
        return token
    },
    verifyToken(token) {
        if (!token) {
            return false
        }

        try {
            let result = jwt.verify(token, secret)
            return result
        } catch (err) {
            return false
        }
    },

    // expiresIn : expiresIn    ===> es6 写法
    expiresIn
}