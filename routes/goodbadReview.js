const router = require('koa-router')();
const goodbadReview= require('../models/goodbadReviewSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/goodbadReview');

router.get('/all', async (ctx) => {
  // const {userId,userName,state}  = ctx.request.query
  log4js.info('get goodbadReview success');
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  // if (userId) params.userId = userId;
  // if(userName) params.userName = userName;
  // if(state && state != 0) params.state = state;
  try {
    const query = goodbadReview.find(params).sort({ createTime: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await goodbadReview.countDocuments(params)
    ctx.body = util.success({
      page:{
        ...page,
        total
      },
      list
    });
  } catch (err) {
    ctx.body = util.fail(`查询异常${err}`)
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add goodbadReview success');
  try {
    log4js.info(ctx.request.body);
    const item = await new goodbadReview(ctx.request.body);
    await item
      .save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success(msg='提交成功');
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/update',async (ctx)=>{
  log4js.info('confirm goodbadReview success')
  log4js.info(ctx.request.body)
  const {_id,replyContent} = ctx.request.body
  try {
    log4js.info(ctx.request.body)
    const item = await goodbadReview.findOneAndUpdate({_id:_id},{hasReply:1}).findOneAndUpdate({_id:_id},{replyContent:replyContent});
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

// 统计
router.get('/stat_by_dept',async (ctx)=>{
  log4js.info('get  goodbadReview statistics success')
  try {
    let data = await goodbadReview.aggregate([
      {
        $group: {
          _id: '$dept',        // 分组依据
          count: { $sum: 1 }      // 统计数量
        }
      }
    ])
    ctx.body = util.success(data = data,msg='返回成功')
  }catch(err){
    log4js.info(err)
  }
})
//当月的按照userName分类的数据
router.get('/stat_byuser_curmonth',async (ctx)=>{
  const {startDate,endDate}= ctx.request.query
  if(startDate){
    console.log('startDate=>',new Date(startDate))
    try {
      let data = await goodbadReview.aggregate([
        { $match: { createTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        } } },
        {
          $group: {
            _id: '$userName',   // 按用户名分组
            count: { $sum: 1 }  // 统计分组数量
          }
        }
      ])
      ctx.body = util.success(data = data,msg='返回成功')
    }catch(err){
      log4js.info(err)
    }
  }else{
    try {
      let data = await goodbadReview.aggregate([
        {
          $group: {
            _id: '$userName',        // 分组依据
            count: { $sum: 1 }      // 统计数量
          }
        }
      ])
      ctx.body = util.success(data = data,msg='返回成功')
    }catch(err){
      log4js.info(err)
    }

  }

})
module.exports = router;
