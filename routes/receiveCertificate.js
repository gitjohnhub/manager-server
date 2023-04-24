/**
 * 遗失物品模块
 */
const router = require('koa-router')()
const receiveCertificate = require('./../models/receiveCertificateSchema')
const log4js = require('./../utils/log4j')
const util = require('./../utils/util')

router.prefix('/receiveCertificate')
router.get('/all',async (ctx)=>{
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  // if (userId) params.userId = userId;
  // if(userName) params.userName = userName;
  // if(state && state != 0) params.state = state;
  try {
    const query = receiveCertificate.find(params).sort({ createTime: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await receiveCertificate.countDocuments(params)
    ctx.body = util.success({
      page:{
        ...page,
        total
      },
      list
    });
  }catch(err){
    log4js.info(err)
  }
})
router.post('/add',async (ctx)=>{
  log4js.info('add receiveCertificate success')

  try {
    log4js.info(ctx.request.body)
    const item = await new receiveCertificate(ctx.request.body);
    await item.save().catch(err=>{
      log4js.info(err)
    })
    ctx.body = util.success(data = item.companyName)
  }catch(err){
    log4js.info(err)
  }
})
router.post('/update',async (ctx)=>{
  log4js.info('confirm receiveCertificate success')
  log4js.info(ctx.request.body)
  const {_id,confirmer} = ctx.request.body
  try {
    log4js.info(ctx.request.body)
    const item = await receiveCertificate.findOneAndUpdate({_id:_id},{confirmer:confirmer}).findOneAndUpdate({_id:_id},{hasDraw:1}).findOneAndUpdate({_id:_id},{drawDate:new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()});
    await item.save().then(res=>{
      console.log(item.confirmer);
    }).catch(err=>{
      log4js.info(err)
    })
    ctx.body = util.success(data = item.confirmer)
  }catch(err){
    log4js.info(err)
  }
})
module.exports = router