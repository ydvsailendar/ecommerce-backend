const mongoose = require('mongoose');
const Product = require('../../schema/product');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const resolvers = {
  Query: {
    Products: () => {
      return Product.find().lean();
    }
  }
};

module.exports = resolvers;
