const router = require('koa-router')();
const finance = require('../models/financeSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/finance');

router.get('/all', async (ctx) => {
  console.log(ctx.request.query)
  log4js.info('get finance success');
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  // if (userId) params.userId = userId;
  // if(state && state != 0) params.state = state;
  try {
    const query = finance.find(params).sort({ buydate: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await finance.countDocuments(params)
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
  log4js.info('add finance success');
  try {
    const {userName} = ctx.request.body
    log4js.debug(userName);

    const item = await new finance(ctx.request.body);
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
router.post('/update', async (ctx) => {
  try {
    // log4js.info(ctx.request.body);
    const {_id,item,category,method,price,subCategory} = ctx.request.body
    const user = await finance.findById(_id)
    log4js.info(user)
    user.category = category
    user.item = item
    user.method = method
    user.price = price
    user.subCategory = subCategory
    await user.save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success((data = user.price));
  } catch (err) {
    log4js.info(err);
  }
})

// 统计
router.get('/stat_by_dept',async (ctx)=>{
  log4js.info('get  finance statistics success')
  const {startDate,endDate}= ctx.request.query
  if(startDate){
    console.log('startDate=>',new Date(startDate))
    try {
      let data = await finance.aggregate([
        { $match: { createTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        } } },
        {
          $group: {
            _id: '$dept',   // 按照部门
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
      let data = await finance.aggregate([
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

  }
  // try {
  //   let data = await finance.aggregate([
  //     {
  //       $group: {
  //         _id: '$dept',        // 分组依据
  //         count: { $sum: 1 }      // 统计数量
  //       }
  //     }
  //   ])
  //   ctx.body = util.success(data = data,msg='返回成功')
  // }catch(err){
  //   log4js.info(err)
  // }
})
//当月的按照userName分类的数据
router.get('/phone_stat_byuser_curmonth',async (ctx)=>{
  const {startDate,endDate}= ctx.request.query
  if(startDate){
    console.log('startDate=>',new Date(startDate))
    try {
      let data = await finance.aggregate([
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
      let data = await finance.aggregate([
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
