const mongoose = require('mongoose');
const Product = require('../../schema/product');
require('dotenv').config();

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const resolvers = {
  Query: {
    Products: () => {
      return Product.find().lean();
    },
    Product: async (_, { id }) => {
      try {
        let product = await Product.findById(id).lean();
        if (!product) {
          throw new Error('Product not found!');
        }
        return product;
      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
    addProduct: async (_, { name, description, price, thumbnail, count }) => {
      try {
        if (!name || !description || !price || !count || !thumbnail) {
          throw new Error('Missing product properties!');
        }
        let product = new Product({
          name,
          description,
          thumbnail,
          price,
          count
        });
        let result = await product.save();
        return result;
      } catch (err) {
        return err;
      }
    },
    removeProduct: async (_, { id }) => {
      try {
        let product = await Product.findById(id);
        if (!product) {
          throw new Error('Product not found!');
        }
        await Product.findByIdAndDelete({ _id: id });
        return id;
      } catch (err) {
        return err;
      }
    },
    updateProduct: async (
      _,
      { id, name, description, price, count, thumbnail }
    ) => {
      try {
        if (!id || !name || !description || !price || !count || !thumbnail) {
          throw new Error('Missing product properties!');
        }
        let product = await Product.findById(id).lean();
        if (!product) {
          throw new Error('Product not found!');
        }
        product = await Product.findByIdAndUpdate(
          id,
          { name, description, price, count, thumbnail },
          { new: true }
        );
        return product;
      } catch (err) {
        return err;
      }
    },
    addReview: async (_, { user, comment, rating, productId }) => {
      try {
        let product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found!');
        }
        if (!user) {
          throw new Error('Must login to review!');
        }
        if (!comment && !rating) {
          throw Error('Must provide rating or comment!');
        }
        if (
          product.reviews.filter((item) => String(item.user) === user)
            .length !== 0
        ) {
          throw new Error('Already reviewed this product!');
        }
        let review;
        if (comment && !rating) {
          review = { user, comment };
        } else if (rating && !comment) {
          review = { user, rating };
        } else {
          review = { user, rating, comment };
        }
        product.reviews.push(review);
        await product.save();
        return review;
      } catch (err) {
        return err;
      }
    },
    updateReview: async (_, { user, comment, rating, productId }) => {
      try {
        let product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found!');
        }
        if (!user) {
          throw new Error('Must login to review!');
        }
        if (!comment && !rating) {
          throw Error('Must provide rating or comment!');
        }
        let review;
        product.reviews.forEach((element, index) => {
          if (String(element.user) === user) {
            if (product.reviews[index] === element) {
              if (comment && !rating) {
                review = { user, comment };
                product.reviews[index].comment = comment;
              } else if (rating && !comment) {
                review = { user, rating };
                product.reviews[index].rating = rating;
              } else {
                review = { user, comment, rating };
                product.reviews[index].comment = comment;
                product.reviews[index].rating = rating;
              }
            }
          }
        });
        await product.save();
        return review;
      } catch (err) {
        return err;
      }
    },
    deleteReview: async (_, { user, productId }) => {
      try {
        let product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found!');
        }
        if (!user) {
          throw Error('Reviewer not found!');
        }
        product.reviews.forEach((element, index) => {
          if (String(element.user) === user) {
            if (product.reviews[index] === element) {
              product.reviews.splice(index, 1);
            }
          }
        });
        await product.save();
        return user;
      } catch (err) {
        return err;
      }
    }
  },
  Subscription: {
    Products: () => {
      return Product.find().lean();
    }
  }
};

module.exports = resolvers;
