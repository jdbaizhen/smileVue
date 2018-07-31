const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})

router.post('/register', async (ctx) => {
    let registerUser = ctx.request.body
    let username = registerUser.username
    const User = mongoose.model('User')
    let result = await User.findOne({username: username}).exec()
    if (result) {
      ctx.body = { code: 500, message: '该账户已被注册' }
    } else {
      let newUser = new User(registerUser)
      await newUser.save().then(() => {
        ctx.body = { code: 200, message: '注册成功' }
      })
    }
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  let username = loginUser.username
  let password = loginUser.password
  const User = mongoose.model('User')

  await User.findOne({username: username}).exec()
    .then(async (result) => {
      console.log(result)
      if (result) {
        if (password === result.password) {
          ctx.body = {
            code: 200,
            message: '登陆成功'
          }
        } else {
          ctx.body = {
            code: 501,
            message: '密码错误'
          }
        }
      } else {
        ctx.body = {
          code: 502,
          message: '用户名不存在'
        }
      }
    })
    .catch((error) => {
      ctx.body = {
        code: 503,
        message: error
      }
    })
})

module.exports = router
