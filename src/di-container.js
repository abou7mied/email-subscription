const { Container } = require('inversify');
const { TYPES } = require('./common');
const { SubscriptionController, SubscriptionDAL } = require('./subscription');
const Validation = require('./utils/validation');
const Database = require('./database');

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

module.exports = {
  container,
};
