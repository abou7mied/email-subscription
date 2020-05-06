const { Container } = require('inversify');
const { TYPES } = require('./src/common');
const { SubscriptionController, SubscriptionDAL } = require('./src/subscription');
const Validation = require('./src/utils/validation');
const Database = require('./src/database');
const Mailer = require('./src/email/mailer');

const container = new Container();

container.bind(TYPES.Database)
  .to(Database)
  .inSingletonScope();

container.bind(TYPES.SubscriptionDAL)
  .to(SubscriptionDAL)
  .inSingletonScope();

container.bind(TYPES.SubscriptionController)
  .to(SubscriptionController)
  .inSingletonScope();

container.bind(TYPES.Validation)
  .to(Validation)
  .inSingletonScope();

container.bind(TYPES.Mailer)
  .to(Mailer)
  .inSingletonScope();

module.exports = {
  container,
};
