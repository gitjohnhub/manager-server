/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const log4js = require('./../utils/log4j')
router.prefix('/users')
router.post('/login',async (ctx)=>{
  log4js.info('login visit')
  try {
    const {userName,userPwd} = ctx.request.body;
    const res = await User.findOne({
      userName,
      userPwd
    })
    if (res){
      log4js.info(res)
      ctx.body = util.success(res)
    }else{
      log4js.info(util.CODE.USER_ACCOUNT_ERROR)
      ctx.body = util.fail("帐号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }


})

module.exports = router
