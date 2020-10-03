const nodemailer = require('nodemailer');

const mailer = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: subject,
    text: message
  });
  return info.messageId;
};

module.exports = mailer;
