const mongoose = require('mongoose');
const Product = require('../src/schema/product');
const User = require('../src/schema/user');
const Cart = require('../src/schema/cart');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

(async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Product.collection.drop();
    await User.collection.drop();
    await Cart.collection.drop();
    console.log('cleared');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
