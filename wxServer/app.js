const Koa = require('koa');
const router = require('koa-router')();
var ctrl = require('./controller.js')
const app = new Koa()
app.use(require('kcors')())
app.use(router.routes())
router.get('/list', ctrl.goods);