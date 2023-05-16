const router = require('koa-router')();
const onlineHelp= require('../models/onlineHelpSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/onlineHelp');

router.get('/all', async (ctx) => {
  const {dept}  = ctx.request.query
  log4js.info('get onlineHelp success');
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  if (dept) params.dept = dept;
  // if(userName) params.userName = userName;
  // if(state && state != 0) params.state = state;
  try {
    const query = onlineHelp.find(params).sort({ createTime: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await onlineHelp.countDocuments(params)
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
  log4js.info('add onlineHelp success');
  try {
    log4js.info(ctx.request.body);
    const item = await new onlineHelp(ctx.request.body);
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

// 统计
router.get('/stat_by_dept',async (ctx)=>{
  log4js.info('get  onlineHelp statistics success')
  try {
    let data = await onlineHelp.aggregate([
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
      let data = await onlineHelp.aggregate([
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
      let data = await onlineHelp.aggregate([
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
