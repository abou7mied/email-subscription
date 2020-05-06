const inversify = require('inversify');
const { TYPES } = require('../common');

const subscribeSchema = {
  type: 'object',
  properties: {
    email: { format: 'email' },
  },
  required: ['email'],
};

const userDataSchemas = {
  subscribe: subscribeSchema,
  checkEmail: subscribeSchema,
};


class SubscriptionController {
  constructor(subscriptionDAL, validation) {
    this.subscriptionDAL = subscriptionDAL;
    this.validators = {
      subscribe: validation.buildValidator(userDataSchemas.subscribe),
    };
  }

  async subscribe(email) {
    await this.validators.subscribe({ email });
    const subscription = await this.subscriptionDAL.createSubscription(email);
    return {
      subscription,
    };
  }

  async checkEmail(email) {
    await this.validators.subscribe({ email });
    const subscription = await this.subscriptionDAL.findSubscriptionByEmail(email);
    const response = {
      subscribed: !!subscription,
    };
    if (subscription) {
      response.subscription = subscription;
    }
    return response;
  }
}

inversify.decorate(inversify.injectable(), SubscriptionController);
inversify.decorate(inversify.inject(TYPES.SubscriptionDAL), SubscriptionController, 0);
inversify.decorate(inversify.inject(TYPES.Validation), SubscriptionController, 1);

module.exports = SubscriptionController;
