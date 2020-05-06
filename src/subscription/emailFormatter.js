module.exports = () => {
  const body = 'Thank you for subscribing to our mailing list';
  return {
    subject: 'Welcome to our mailing list',
    text: body,
    html: body,
  };
};
