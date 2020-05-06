const inversify = require('inversify');
const subscriptionModel = require('./subscription');

function normalizeSubscription(subscription) {
  return {
    id: subscription._id,
    email: subscription.email,
    expireAt: subscription.expireAt,
  };
}

class SubscriptionDAL {
  findSubscriptionByEmail(email) {
    return subscriptionModel.findOne({
      email,
    })
      .then((data) => {
        if (data) {
          return normalizeSubscription(data);
        }
        return null;
      });
  }

  createSubscription(email) {
    return subscriptionModel.findOneAndUpdate({
      email,
    }, {
      expireAt: Date.now() + (30 * 24 * 60 * 60 * 1000),
    }, {
      upsert: true,
      new: true,
    })
      .then(normalizeSubscription);
  }
}

inversify.decorate(inversify.injectable(), SubscriptionDAL);

module.exports = SubscriptionDAL;
