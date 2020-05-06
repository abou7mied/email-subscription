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

  /**
   * @swagger
   *
   * definitions:
   *   Subscription:
   *     type: object
   *     required:
   *       - id
   *       - email
   *     properties:
   *       id:
   *         type: string
   *       email:
   *         type: string
   *         format: email
   */

  /**
   * @swagger
   * /api/subscribe:
   *  post:
   *    parameters:
   *       - name: email
   *         description: The subscriber email.
   *         in: formData
   *         required: true
   *         type: string
   *    responses:
   *       200:
   *         description: subscription info
   *         schema:
   *           type: object
   *           properties:
   *             subscription:
   *                $ref: '#/definitions/Subscription'
   */
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

  /**
   * @swagger
   * /api/checkEmail:
   *  get:
   *    parameters:
   *       - name: email
   *         description: The subscriber email to check
   *         in: query
   *         required: true
   *         type: string
   *    responses:
   *       200:
   *         description: subscription status
   *         schema:
   *           type: object
   *           properties:
   *             subscribed:
   *              type: boolean
   *              required: true
   *             subscription:
   *                $ref: '#/definitions/Subscription'
   */
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
