const router = require('koa-router')();
const User = require('./../models/userSchema');
const util = require('./../utils/util');
const log4js = require('./../utils/log4j');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

router.prefix('/leave');
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
      ctx.body = util.success(1);

});

module.exports = router;
