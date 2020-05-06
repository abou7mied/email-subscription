require('dotenv')
  .config({ path: './.env.test' });
const mongoose = require('mongoose');
const { container } = require('../di-container');
const { TYPES } = require('../src/common');
const subscriptionModel = require('../src/subscription/subscription');

const sendMailFn = jest
  .fn()
  .mockResolvedValue(true)
  .mockName('sendMail');

container.rebind(TYPES.Mailer)
  .toConstantValue({
    sendMail: sendMailFn,
  });

async function connectMongo() {
  const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/subscribers-test';
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}

async function clearDatabase() {
  await subscriptionModel.remove();
}

module.exports = {
  connectMongo,
  clearDatabase,
  container,
  sendMailFn,
};
