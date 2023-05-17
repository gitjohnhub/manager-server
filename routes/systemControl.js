const router = require('koa-router')();
const systemControl = require('../models/systemControlSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/systemControl');

router.get('/all', async (ctx) => {
  log4js.info('get systemControl success');
  try {
    const res = await systemControl.find();
    ctx.body = util.success((data = res.reverse()));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add systemControl success');
  try {
    log4js.info(ctx.request.body);
    const item = await new systemControl(ctx.request.body);
    await item
      .save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success(data=item.address);
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/update', async (ctx) => {
  try {
    // log4js.info(ctx.request.body);
    const {_id,name,address,account,password,charger,note} = ctx.request.body
    const user = await systemControl.findById(_id)
    log4js.info(user)
    user.name = name
    user.address = address
    user.account = account
    user.password = password
    user.charger = charger
    user.note = note
    await user.save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success((data = user.name));
  } catch (err) {
    log4js.info(err);
  }
});


module.exports = router;
