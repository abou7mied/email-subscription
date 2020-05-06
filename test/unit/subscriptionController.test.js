require('reflect-metadata');
const mongoose = require('mongoose');
const { container } = require('../../src/di-container');
const { TYPES } = require('../../src/common');
const subscriptionModel = require('../../src/subscription/subscription');

const subscriptionController = container.get(TYPES.SubscriptionController);

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/subscribers-test');
  await subscriptionModel.remove();
});

afterEach(async () => {
  await subscriptionModel.remove();
});

afterAll(() => {
  return mongoose.disconnect();
});

describe('Subscription Controller', () => {
  describe('Create subscription', () => {
    it('Passes invalid email', () => {
      return expect(subscriptionController.subscribe('invalid-email-address'))
        .rejects
        .toThrow(/email/);
    });

    it('Create valid email ', () => {
      return expect(subscriptionController.subscribe('email@example.com'))
        .resolves
        .toHaveProperty('subscription');
    });
  });

  describe('Check subscription', () => {
    it('Passes invalid email', () => {
      return expect(subscriptionController.checkEmail('invalid-email-address'))
        .rejects
        .toThrow(/email/);
    });

    it('Check non-subscribed email', () => {
      return expect(subscriptionController.checkEmail('email@example.com'))
        .resolves
        .toMatchObject({ subscribed: false });
    });

    it('Check subscribed email', async () => {
      const email = 'email@example.com';
      await subscriptionController.subscribe(email);
      return expect(subscriptionController.checkEmail(email))
        .resolves
        .toMatchObject({ subscribed: true });
    });
  });
});
