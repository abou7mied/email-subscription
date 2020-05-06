const Router = require('@koa/router');
const { subscriptionRouterFactory } = require('../subscription');

function init(container) {
  const router = new Router();

  const subscriptionRouter = subscriptionRouterFactory(container);

  router.get('/', (ctx) => {
    ctx.body = 'Home Page';
  });

  router.use('/api', async (ctx, next) => {
    try {
      await next();
      ctx.body = {
        status: 'ok',
        ...ctx.body,
      };
    } catch (err) {
      ctx.status = err.status || 500;
      // TODO: handle sensitive data
      ctx.body = {
        status: 'error',
        error: err.message,
      };
    }
  });

  router.get('/api', async (ctx) => {
    ctx.body = {};
  });

  router.use('/api', subscriptionRouter.routes(), subscriptionRouter.allowedMethods());

  return router;
}

module.exports = init;
