const router = require('koa-router')();
const leaveOfAbsence = require('../models/leaveOfAbsenceSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

router.prefix('/leaveOfAbsence');
router.get('/count', async (ctx) => {
  // const token = ctx.request.header.authorization.split(' ')[1];
  // try {
  //   jwt.verify(token, 'zwzx');
  //   ctx.body = util.success(1);
  // } catch (err) {
  //   log4js.info("authErr=>",err);
  //   ctx.body = util.fail(msg='登录过期',code=CODE.AUTH_ERROR);
  // }
  // log4js.info('get /leave/count=>');
  // ctx.body = util.success(1)
  ctx.body = util.success((data = 1));
  log4js.info('ctx.body=>', JSON.stringify(ctx.body));
});
router.post('/all', async (ctx) => {
  log4js.info('get leave success');
  try {
    const { userName } = ctx.request.body;
    const res = await leaveOfAbsence.find({
      userName,
    });
    ctx.body = util.success((data = res));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add leave success');
  try {
    log4js.info(ctx.request.body);
    const item = await new leaveOfAbsence(ctx.request.body);
    await item
      .save()
      .then((res) => {
        console.log(item.IdNum);
      })
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success((data = item.leaveDate[0]));
  } catch (err) {
    log4js.info(err);
  }
});

module.exports = router;
