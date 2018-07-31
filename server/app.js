const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
let router = new Router()
const mongoose = require('mongoose')
const {connect, initSchema} = require('./database/init.js')
let user = require('./appApi/User.js')
let goods = require('./appApi/Goods.js')

app.use(cors())
app.use(bodyParser())

router.use('/user', user.routes())
router.use('/goods', goods.routes())
app.use(router.routes()).use(router.allowedMethods())

;(async () => {
  connect()
  initSchema()
})()

app.use(async (ctx) => {
  ctx.body = '<h3>server listen of port 3333</h3>'
})
app.listen('3333', () => {
  console.log('server listen of port 3333')
})
