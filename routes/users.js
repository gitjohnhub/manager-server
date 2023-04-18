/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const log4js = require('./../utils/log4j')
const jwt = require('jsonwebtoken');
router.prefix('/users')
router.post('/login',async (ctx)=>{
  try {
    const {userName,userPwd} = ctx.request.body;
    const res = await User.findOne({
      userName,
      userPwd
    })
    const data = res._doc

    const token = jwt.sign({data:data}, 'zwzx',{expiresIn:30});
    if (res){
      data.token = token
      ctx.body = util.success(data)
    }else{
      ctx.body = util.fail("帐号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }


})

module.exports = router
