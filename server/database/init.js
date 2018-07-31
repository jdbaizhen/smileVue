const mongoose = require('mongoose')
const glob = require('glob')
const {resolve} = require('path')
const db = 'mongodb://localhost:27017/smile-db'

mongoose.Promise = global.Promise

exports.connect = () => {
  console.log('开始连接数据库')
  // 连接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 数据库重连
    mongoose.connection.on('disconnected', () => {
      console.log('**********数据库断开*************')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题！！！')
      }
    })

    // 报错重连
    mongoose.connection.on('error', () => {
      console.log('**********数据库断开*************')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题！！！')
      }
    })

    // 连接成功
    mongoose.connection.once('open', () => {
      console.log('mongodb connected successfully!')
      resolve()
    })
  })
}

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
