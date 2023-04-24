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
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  // if (userId) params.userId = userId;
  // if(userName) params.userName = userName;
  // if(state && state != 0) params.state = state;
  try {
    const query = lostFound.find(params).sort({ createTime: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await lostFound.countDocuments(params)
    log4js.info(query)
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
// 统计
router.get('/statistics',async (ctx)=>{
  log4js.info('get lostFound statistics success')
  try {
    let data = await lostFound.aggregate([
      {
        $group: {
          _id: '$itemType',        // 分组依据
          count: { $sum: 1 }      // 统计数量
        }
      }
    ])
    ctx.body = util.success(data = data,msg='返回成功')
  }catch(err){
    log4js.info(err)
  }
})
module.exports = router