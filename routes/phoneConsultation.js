const router = require('koa-router')();
const phoneConsultation = require('../models/phoneConsultationSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/phoneConsultation');

router.get('/all', async (ctx) => {
  log4js.info('get phoneConsultation success');
  try {
    const res = await phoneConsultation.find();
    ctx.body = util.success((data = res.reverse()));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add phoneConsultation success');
  try {
    log4js.info(ctx.request.body);
    const item = await new phoneConsultation(ctx.request.body);
    await item
      .save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success();
  } catch (err) {
    log4js.info(err);
  }
});

module.exports = router;
