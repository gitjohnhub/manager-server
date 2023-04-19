/**
 * 遗失物品模块
 */
const router = require('koa-router')()
const lostFound = require('./../models/lostFoundSchema')
const log4js = require('./../utils/log4j')
const util = require('./../utils/util')

router.prefix('/lostFound')
router.get('/all',async (ctx)=>{
  log4js.info('get lostFound success')
  try {
    const res = await lostFound.find()
    log4js.info(res)
    ctx.body = util.success(data = res)
  }catch(err){
    log4js.info(err)
  }
})

module.exports = router