const {Container} = require('inversify');
const {TYPES} = require('./common');
const {SubscriptionController, SubscriptionDAL} = require('./subscription');
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

module.exports = {
  container,
};
