const mongoose = require('mongoose');
const Product = require('../src/schema/product');
const User = require('../src/schema/user');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('cleared');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
