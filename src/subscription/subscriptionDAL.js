const inversify = require('inversify');
const subscriptionModel = require('./subscription');

class SubscriptionDAL {
  findSubscriptionByEmail(email) {
    return subscriptionModel.findOne({
      email,
    });
  }

  createSubscription(email) {
    return subscriptionModel.create({
      email,
      expireAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    });
  }
}

inversify.decorate(inversify.injectable(), SubscriptionDAL);

module.exports = SubscriptionDAL;
