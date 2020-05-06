require('reflect-metadata');
const mongoose = require('mongoose');
const {
  container, sendMailFn, connectMongo, clearDatabase,
} = require('../common');
const { TYPES } = require('../../src/common');

beforeAll(async () => {
  await connectMongo();
  await clearDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(() => {
  return mongoose.disconnect();
});

const subscriptionController = container.get(TYPES.SubscriptionController);

describe('Subscription Controller', () => {
  beforeEach(() => {
    sendMailFn.mockClear();
  });

  describe('Create subscription', () => {
    it('Passing invalid email', () => {
      return expect(subscriptionController.subscribe('invalid-email-address'))
        .rejects
        .toThrow(/email/);
    });

    it('Passing valid email ', () => {
      return expect(subscriptionController.subscribe('email@example.com'))
        .resolves
        .toHaveProperty('subscription');
    });

    it('Should send an email ', async () => {
      await subscriptionController.subscribe('email@example.com');
      await expect(sendMailFn)
        .toBeCalled();
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
