/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')
const log4js = require('./../utils/log4j')
const jwt = require('jsonwebtoken');
const md5 = require('md5')

router.prefix('/users')
router.post('/login',async (ctx)=>{
  log4js.info('post success')
  try {
    const {userName,userPwd} = ctx.request.body;
    const md5_userPwd = md5(userPwd)
    const res = await User.findOne({
      userName,
      userPwd:md5_userPwd
    })
    console.log(res)
    const data = res._doc
    log4js.info("res=>",data)
    const token = jwt.sign({data:data}, 'zwzx',{expiresIn:60*60});
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
