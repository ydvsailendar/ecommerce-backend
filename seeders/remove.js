const mongoose = require('mongoose');
const Product = require('../src/schema/product');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  try {
    await Product.deleteMany();
    console.log('cleared');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
