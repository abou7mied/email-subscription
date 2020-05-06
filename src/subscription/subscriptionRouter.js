const Router = require('@koa/router');
const {TYPES} = require('../common');

const router = new Router();

function init(container) {
  const subscriptionController = container.get(TYPES.SubscriptionController);
  router.post('/subscribe', async (ctx) => {
    const {body} = ctx.request;
    ctx.body = await subscriptionController.subscribe(body.email);
  });

  router.get('/checkEmail', async (ctx) => {
    const {query} = ctx.request;
    ctx.body = await subscriptionController.checkEmail(query.email);
  });

  return router;
}


module.exports = init;
