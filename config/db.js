/**
 * 数据库连接
 */

const mongoose = require('mongoose')
const config = require('./index')
const log4js = require('../utils/log4j')


mongoose.connect(config.URL);
// mongoose.connect('mongodb://zwzx:qwe123@127.0.0.1:27017/manager');
const db = mongoose.connection;

db.on('error',()=>{
  log4js.error('***数据库连接失败****')
})
db.on('open',()=>{
  log4js.info('***数据库连接成功****')
})