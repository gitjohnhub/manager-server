const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const log4js = require('./../utils/log4j')
const jwt = require('jsonwebtoken');
const md5 = require('md5')

router.prefix('/leave')
router.get('/count',async (ctx)=>{
  log4js.info("get /leave/count=>")
  ctx.body = util.success(1)
})

module.exports = router
