/**
 * 初始化配制字段 
 */
const log = require('../../utils/log')
const options = require('../../conf/option')
const models = require('../../model/mongo')

// 提供一个类，具有一个异步方法：beforeServerStart
module.exports = class {
    async beforeServerStart() {
        for (const option of options) {
            let key = option.key
            let count = await models.option.find({ key }).count().exec()
            if (count === 0) {
                await models.option.create(option)
                log.info(`Option ${key} created`)
            }
        }
    }
}