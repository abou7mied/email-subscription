const inversify = require('inversify');
const { TYPES } = require('../common');

class SubscriptionController {
  constructor(subscriptionDAL) {
    this.subscriptionDAL = subscriptionDAL;
  }

  async subscribe(email) {
    // TODO: handle duplicates
    const subscription = await this.subscriptionDAL.createSubscription(email);
    return {
      subscription,
    };
  }

  async checkEmail(email) {
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

module.exports = SubscriptionController;
