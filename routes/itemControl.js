const router = require('koa-router')();
const itemModel = require('../models/itemSchema');
const util = require('../utils/util');
const log4js = require('../utils/log4j');

router.prefix('/item');

router.post('/all', async (ctx) => {
  const {item} = ctx.request.body
  const where = {}
  if(item){
    where.item = item
  }
  try {
    const res = await itemModel.find(where);
    ctx.body = util.success((data = res));
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/add', async (ctx) => {
  try {
    log4js.info(ctx.request.body);
    const addItem = await new itemModel(ctx.request.body);
    await addItem
      .save()
      .catch((err) => {
        log4js.info(err);
      });
    ctx.body = util.success(data=addItem);
  } catch (err) {
    log4js.info(err);
  }
});
router.post('/update', async (ctx) => {
  try {
    // log4js.info(ctx.request.body);
    const {_id,name,address,account,password,charger,note} = ctx.request.body
    const user = await item.findById(_id)
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
