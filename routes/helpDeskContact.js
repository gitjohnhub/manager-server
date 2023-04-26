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
router.post('/update', async (ctx) => {
  try {
    // log4js.info(ctx.request.body);
    const {_id,dept,dept_windows,address,note,contactNum} = ctx.request.body
    const user = await helpDeskContact.findById(_id)
    log4js.info(user)
    user.dept = dept
    user.dept_windows = dept_windows
    user.address = address
    user.note = note
    user.contactNum = contactNum
    await user.save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success((data = user.userName));
  } catch (err) {
    log4js.info(err);
  }
});


module.exports = router;
