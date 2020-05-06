const inversify = require('inversify');
const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_TRANSPORT_HOST,
      port: process.env.EMAIL_TRANSPORT_PORT,
      secure: !!process.env.EMAIL_TRANSPORT_SECURE,
      auth: {
        user: process.env.EMAIL_TRANSPORT_USER,
        pass: process.env.EMAIL_TRANSPORT_PASSWORD,
      },
    });
  }

  async sendMail(to, subject, text, html) {
    const info = await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent to recipient');
    console.log('info', info);

    return info;
  }
}

inversify.decorate(inversify.injectable(), Mailer);

module.exports = Mailer;
