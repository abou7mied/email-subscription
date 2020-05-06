require('reflect-metadata');

const request = require('supertest');
const mongoose = require('mongoose');
const { container } = require('../common');
const appFactory = require('../../src/app');
const subscriptionModel = require('../../src/subscription/subscription');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/subscribers-test');
  await subscriptionModel.remove();
});

afterEach(async () => {
  await subscriptionModel.remove();
});

const app = appFactory(container)
  .listen(0);

afterAll(() => {
  return Promise.all([
    app.close(),
    mongoose.disconnect(),
  ]);
});

describe('Api', () => {
  describe('/subscribe endpoint', () => {
    it('Should respond with subscription info', () => {
      expect.assertions(2);
      return request(app)
        .post('/api/subscribe')
        .send({ email: 'email@example.com' })
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toMatchObject({
              status: 'ok',
            });
          expect(body)
            .toHaveProperty('subscription');
        });
    });
  });

  describe('/checkEmail endpoint', () => {
    it('Email not subscribed', () => {
      expect.assertions(1);
      return request(app)
        .get('/api/checkEmail')
        .query({ email: 'email@example.com' })
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toMatchObject({
              status: 'ok',
              subscribed: false,
            });
        });
    });

    it('Email is subscribed', async () => {
      expect.assertions(1);
      await request(app)
        .post('/api/subscribe')
        .send({ email: 'email@example.com' });

      return request(app)
        .get('/api/checkEmail')
        .query({ email: 'email@example.com' })
        .expect(200)
        .then(({ body }) => {
          expect(body)
            .toMatchObject({
              status: 'ok',
              subscribed: true,
            });
        });
    });
  });
});
