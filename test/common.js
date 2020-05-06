const { container } = require('../di-container');
const { TYPES } = require('../src/common');

const sendMailFn = jest
  .fn()
  .mockResolvedValue(true)
  .mockName('sendMail');

container.rebind(TYPES.Mailer)
  .toConstantValue({
    sendMail: sendMailFn,
  });

module.exports = {
  container,
  sendMailFn,
};
