const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const Router = require('koa-router')

let home = new Router();

home.get('/', async(ctx) => {
    ctx.body = 'home'
})

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`

    })
}