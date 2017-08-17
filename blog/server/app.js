// 全局变量
global.Promise = require('bluebird')

const log = require('./utils/log')
const Koa = require('koa')
const koaRouter = require('koa-router')
const mongoRest = require('./mongoRest')
const models = require('./model/mongo')
const redis = require('./model/redis')
const config = require('./conf/config')
const configName = process.env.NODE_ENV === '"development"' ? 'dev' : 'prod'
const blogpackConfig = require(`./build/blogpack.${configName}.config`)
blogpackConfig.models = models
blogpackConfig.redis = redis
const config = require('./conf/config')

const app = new Koa()
const router = koaRouter()

module.exports = (async() => {
    try {
        console.log('laosu')
    } catch (err) {

    }
})