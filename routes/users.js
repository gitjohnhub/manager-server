/**
 * 用户管理模块
 */
const router = require('koa-router')();
const User = require('./../models/userSchema');
const util = require('./../utils/util');
const log4js = require('./../utils/log4j');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

router.prefix('/users');
router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    const md5_userPwd = md5(userPwd);
    const res = await User.findOne({
      userName,
      userPwd: md5_userPwd,
    });
    if (res) {
      const data = res._doc;
      const token = jwt.sign({ data: data }, 'zwzx', { expiresIn: 60 * 60 });
      data.token = token;
      ctx.body = util.success(data);
    } else {
      log4js.info('帐号或密码不正确')
      ctx.body = util.fail(msg='帐号或密码不正确');
    }
  } catch (error) {
    ctx.body = util.fail(error.msg);
  }
});
router.get('/all',async (ctx)=>{
  log4js.info('get users success')
  try {
    const res = await User.find()
    ctx.body = util.success(data = res.reverse())
  }catch(err){
    log4js.info(err)
  }
})
router.post('/register', async (ctx) => {
  log4js.info('post register success');
  try {
    const { userName, userPwd } = ctx.request.body;
    const md5_userPwd = md5(userPwd);
    const res = await User.findOne({
      userName,
    });
    console.log(res);
    if (res) {
      ctx.body = util.fail('账号已被注册，请重新注册');
    } else {
      const item = await new User({ userName: userName, userPwd: md5_userPwd });
      await item
        .save()
        .then((res) => {
          ctx.body = util.success(data=userName);
        })
        .catch((err) => {
          log4js.info(err);
          ctx.body = util.fail(msg='服务器内部错误，请联系管理员');
        });

    }
  } catch (error) {
    ctx.body = util.fail(error.msg);
  }
});

router.post('/markLeave',async (ctx)=>{
  log4js.info('mark leave success')
  log4js.info(ctx.request.body)
  const {_id} = ctx.request.body
  try {
    log4js.info(ctx.request.body)
    const item = await User.findOneAndUpdate({_id:_id},{state:2});
    await item.save().then(res=>{
      log4js.info(`item.userName=>${item.userName},item.state=>${item.state}`);
    }).catch(err=>{
      log4js.info(err)
      ctx.body = util.fail(err);
    })
    ctx.body = util.success(data=item.state);
  }catch(err){
    log4js.info(err)
  }
})
router.post('/markEntry',async (ctx)=>{
  log4js.info('mark entry success')
  log4js.info(ctx.request.body)
  const {_id} = ctx.request.body
  try {
    log4js.info(ctx.request.body)
    const item = await User.findOneAndUpdate({_id:_id},{state:1});
    await item.save().then(res=>{
      log4js.info(`item.userName=>${item.userName},item.state=>${item.state}`);
    }).catch(err=>{
      log4js.info(err)
    })
    ctx.body = util.success(data = item.state)
  }catch(err){
    log4js.info(err)
  }
})

module.exports = router;
