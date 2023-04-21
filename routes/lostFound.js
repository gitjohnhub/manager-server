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
    ctx.body = util.success(data = res.reverse(),msg='返回成功')
  }catch(err){
    log4js.info(err)
  }
})
router.post('/add',async (ctx)=>{
  log4js.info('add lostFound success')
  try {
    log4js.info(ctx.request.body)
    const lostFoundItem = await new lostFound(ctx.request.body);
    await lostFoundItem.save().then(res=>{
      console.log(lostFoundItem.IdNum);
    }).catch(err=>{
      log4js.info(err)
    })
    ctx.body = util.success(data = lostFoundItem.IdNum)
  }catch(err){
    log4js.info(err)
  }
})
router.post('/confirmLostFound',async (ctx)=>{
  log4js.info('confirm lostFound success')
  log4js.info(ctx.request.body)
  const {_id,confirmer} = ctx.request.body
  try {
    log4js.info(ctx.request.body)
    const lostFoundItem = await lostFound.findOneAndUpdate({_id:_id},{confirmer:confirmer}).findOneAndUpdate({_id:_id},{hasDraw:1});
    await lostFoundItem.save().then(res=>{
      console.log(lostFoundItem.confirmer);
    }).catch(err=>{
      log4js.info(err)
    })
    ctx.body = util.success(data = lostFoundItem.confirmer)
  }catch(err){
    log4js.info(err)
  }
})
module.exports = router