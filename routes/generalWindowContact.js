const router = require('koa-router')();
const generalWindowContact = require('../models/generalWindowContactSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/generalWindowContact');

router.get('/all', async (ctx) => {
  log4js.info('get leave success');
  try {
    const res = await generalWindowContact.find();
    ctx.body = util.success((data = res.reverse()));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add generalWindowContact success');
  try {
    log4js.info(ctx.request.body);
    const item = await new generalWindowContact(ctx.request.body);
    await item
      .save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success(data=item.item);
  } catch (err) {
    log4js.info(err);
  }
});

module.exports = router;
