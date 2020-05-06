const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const apiFactory = require('./api');

function init(container) {
  const app = new Koa();
  const router = apiFactory(container);

  app.use(koaBody());
  app.use(cors());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

module.exports = init;
