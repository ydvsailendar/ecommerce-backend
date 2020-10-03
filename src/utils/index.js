const nodemailer = require('nodemailer');

const mailer = async (email, subject, message) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: message // plain text body
  });
  return info.messageId;
};

module.exports = mailer;
