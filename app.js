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


const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const koa_jwt = require('koa-jwt');
const util = require('./utils/util');
const generalWindowContact = require('./routes/generalWindowContact');
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
router.use(lostFound.routes(), users.allowedMethods());
router.use(leaveOfAbsence.routes(), users.allowedMethods());
router.use(generalWindowContact.routes(), users.allowedMethods());
router.use(receiveCertificate.routes(), users.allowedMethods());

app.use(router.routes(), users.allowedMethods());
// error-handling

app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4js.error(`${err.stack}`);
});

module.exports = app;
