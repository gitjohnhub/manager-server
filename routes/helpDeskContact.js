const router = require('koa-router')();
const helpDeskContact = require('../models/helpDeskContactSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/helpDeskContact');

router.get('/all', async (ctx) => {
  log4js.info('get helpDeskContact success');
  try {
    const res = await helpDeskContact.find();
    ctx.body = util.success((data = res.reverse()));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  log4js.info('add helpDeskContact success');
  try {
    log4js.info(ctx.request.body);
    const item = await new helpDeskContact(ctx.request.body);
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

module.exports = router;
