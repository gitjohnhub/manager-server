const router = require('koa-router')();
const phoneConsultation = require('../models/phoneConsultationSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');
router.prefix('/phoneConsultation');

router.get('/all', async (ctx) => {
  const {dept,item,result,startDate,endDate}  = ctx.request.query
  const {page,skipIndex} = util.pager(ctx.request.query)
  let params = {}
  if(dept) params.dept = {
    $in:JSON.parse(dept),
  };
  if(item) params.item = {
    $in:JSON.parse(item),
  };
  if(result) params.result = {
    $in:JSON.parse(result),
  };;
  if(startDate) params.createTime = {
    $gte: startDate,
    $lte: endDate
  }
  console.log('dept===>',dept)
  // if(state && state != 0) params.state = state;
  try {
    const query = phoneConsultation.find(params).sort({ createTime: -1 });
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await phoneConsultation.countDocuments(params)
    console.log('total===>',total)
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
  log4js.info('add phoneConsultation success');
  try {
    const {userName} = ctx.request.body
    log4js.debug(userName);

    const item = await new phoneConsultation(ctx.request.body);
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
    const {_id,dept,item,result,note} = ctx.request.body
    const user = await phoneConsultation.findById(_id)
    log4js.info(user)
    user.dept = dept
    user.item = item
    user.result = result
    user.note = note
    await user.save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success((data = user.userName));
  } catch (err) {
    log4js.info(err);
  }
})

// 统计
router.get('/stat_by_dept',async (ctx)=>{
  log4js.info('get  phoneConsultation statistics success')
  const {startDate,endDate}= ctx.request.query
  if(startDate){
    console.log('startDate=>',new Date(startDate))
    try {
      let data = await phoneConsultation.aggregate([
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
      let data = await phoneConsultation.aggregate([
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
  //   let data = await phoneConsultation.aggregate([
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
      let data = await phoneConsultation.aggregate([
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
      let data = await phoneConsultation.aggregate([
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
// 统计
router.get('/stat_by_month',async (ctx)=>{
  log4js.info('get phone_stat_by_month success')

  const pipeline = [
    // 将createTime字段转换为月份格式
    {
      $addFields: {
        month: { $dateToString: { format: "%Y-%m", date: "$createTime" } }
      }
    },
    // 按月份对文档进行分组并计算每个月的文档数量
    {
      $group: {
        _id: "$month",
        count: { $sum: 1 }
      }
    },
      // 按_id字段升序排序结果
  {
    $sort: {
      _id: 1
    }
  }
  ];
  let data = await phoneConsultation.aggregate(pipeline)
  ctx.body = util.success(data = data,msg='返回成功')
  // try {
  //   let data = await phoneConsultation.aggregate(pipeline)
  //     ctx.body = util.success(data = data,msg='返回成功')
  //   }catch(error){
  //     log4js.info("error")
  //   }
  });
module.exports = router;
