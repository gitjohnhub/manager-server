const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
// const logger = require('koa-logger')
const log4js = require('./utils/log4j');
// 路由导入
const users = require('./routes/users');
const lostFound = require('./routes/lostFound');
const leaveOfAbsence = require('./routes/leaveOfAbsence');
const receiveCertificate = require('./routes/receiveCertificate')
const helpDeskContact = require('./routes/helpDeskContact')
const phoneConsultation = require('./routes/phoneConsultation');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const koa_jwt = require('koa-jwt');
const util = require('./utils/util');
const generalWindowContact = require('./routes/generalWindowContact');
const goodbadReview = require('./routes/goodbadReview');
const onlineHelp = require('./routes/onlineHelp');
const cannotSolve = require('./routes/cannotSolve');
const systemControl = require('./routes/systemControl');
const finance = require('./routes/finance');
const account = require('./routes/account');
const emsDrawCert = require('./routes/emsDrawCert');
// error handler
onerror(app);

require('./config/db');

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());

app.use(async (ctx, next) => {
  await next().catch((err) => {
    console.log(err)
    if (err.status == '401') {
      ctx.status = 200;
      ctx.body = util.fail('Token认证失败,请重新登录', util.CODE.AUTH_ERROR);
    } else {
      throw err;
    }
  });
});

// 请求认证

// app.use(
//   koa_jwt({ secret: 'zwzx' }).unless({
//     path: [/^\/api\/users\/login/],
//   })
// );

app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

// logger
app.use(async (ctx, next) => {
  // const start = new Date()
  await next();
  // log4js.info("log output");
});
router.prefix('/api');
router.use(users.routes(), users.allowedMethods());
router.use(lostFound.routes(), lostFound.allowedMethods());
router.use(leaveOfAbsence.routes(), leaveOfAbsence.allowedMethods());
router.use(generalWindowContact.routes(), generalWindowContact.allowedMethods());
router.use(receiveCertificate.routes(), receiveCertificate.allowedMethods());
router.use(helpDeskContact.routes(), helpDeskContact.allowedMethods());
router.use(phoneConsultation.routes(), phoneConsultation.allowedMethods());
router.use(onlineHelp.routes(), onlineHelp.allowedMethods());
router.use(goodbadReview.routes(), goodbadReview.allowedMethods());
router.use(cannotSolve.routes(), cannotSolve.allowedMethods());
router.use(systemControl.routes(), systemControl.allowedMethods());
router.use(finance.routes(), finance.allowedMethods());
router.use(emsDrawCert.routes(), emsDrawCert.allowedMethods());
router.use(account.routes(), account.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// error-handling

app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`);
});

module.exports = app;
