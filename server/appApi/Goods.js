const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const allData = JSON.parse(data)
      let saveCount = 0
      const Goods = mongoose.model('Goods')
      allData.map((item, index) => {
        let newGoods = new Goods(item)
        newGoods.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch((error) => {
          console.log(error)
        })
      })
    }
  })
  ctx.body = '开始导入'
})

router.get('/insertAllCateGorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data)
      let saveCount = 0
      const CategorySub = mongoose.model('CategorySub')
      data.RECORDS.map((value, index) => {
        let newCategorySub = new CategorySub(value)
        newCategorySub.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch((err) => {
          console.log('失败' + err)
        })
      })
    }
  })
  ctx.body = '开始导入'
})

router.get('/insertAllCateGory', async (ctx) => {
  fs.readFile('./data_json/Category.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data = JSON.parse(data)
      let saveCount = 0
      const Category = mongoose.model('Category')
      data.RECORDS.map((value, index) => {
        let newCategory = new Category(value)
        newCategory.save().then(() => {
          saveCount++
          console.log('成功' + saveCount)
        }).catch((err) => {
          console.log('失败' + err)
        })
      })
    }
  })
  ctx.body = '开始导入'
})

router.get('/init', async (ctx) => {
  try {
    let result = await fs.readFileSync('./data_json/init.json', 'utf-8')
    let data = JSON.parse(result)
    ctx.body = {code: 200, message: data}
  } catch (error) {
    ctx.body = {code: 500, message: error}
  }
})

router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID: goodsId}).exec()
    ctx.body = {code: 200, message: result}
  } catch (error) {
    ctx.body = {code: 500, message: error}
  }
})

router.post('/getCategoryLsit', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})

module.exports = router
