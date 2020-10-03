const nodemailer = require('nodemailer');

(async () => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
    console.log('created');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
