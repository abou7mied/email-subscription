const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const koaSwagger = require('koa2-swagger-ui');
const swaggerJSDoc = require('swagger-jsdoc');
const apiFactory = require('./api');

const options = {
  definition: {
    info: {
      title: 'Email Subscription API',
      version: '1.0.0',
    },
  },
  apis: ['./src/subscription/subscriptionController.js'],
};


const swaggerSpec = swaggerJSDoc(options);

function init(container) {
  const app = new Koa();
  const router = apiFactory(container);

  app.use(koaBody());
  app.use(cors());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(
    koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        spec: swaggerSpec,
      },
    }),
  );


  return app;
}

module.exports = init;
