const inversify = require('inversify');
const { TYPES } = require('../common');
const emailFormatter = require('./emailFormatter');

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
  constructor(subscriptionDAL, validation, mailer) {
    this.subscriptionDAL = subscriptionDAL;
    this.mailer = mailer;
    this.validators = {
      subscribe: validation.buildValidator(userDataSchemas.subscribe),
    };
  }

  async subscribe(email) {
    await this.validators.subscribe({ email });
    const subscription = await this.subscriptionDAL.createSubscription(email);
    const emailObject = emailFormatter(email);
    this.mailer
      .sendMail(email, emailObject.subject, emailObject.text, emailObject.html)
      .catch(console.error);
    return {
      subscription,
    };
  }

  async checkEmail(email) {
    await this.validators.subscribe({ email });
    const subscription = await this.subscriptionDAL.findSubscriptionByEmail(email);
    const subscribed = !!subscription && (subscription.expireAt > Date.now());
    const response = {
      subscribed,
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
inversify.decorate(inversify.inject(TYPES.Mailer), SubscriptionController, 2);

module.exports = SubscriptionController;
