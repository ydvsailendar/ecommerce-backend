const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Product = require('../../schema/product');
const User = require('../../schema/user');
const Cart = require('../../schema/cart');
const mailer = require('../../utils');

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
    },
    Users: async (_, { token }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        return User.find().lean();
      } catch (err) {
        return err;
      }
    },
    User: async (_, { id, token }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let user = await User.findById(id).lean();
        if (!user) {
          throw new Error('User not found!');
        }
        return user;
      } catch (err) {
        return err;
      }
    },
    MyWishList: async (_, { token }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let wishList = await Cart.find({
          userId: userExists._id,
          inWishList: true
        }).lean();
        return wishList;
      } catch (err) {
        return err;
      }
    },
    MyCart: async (_, { token }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let cart = await Cart.find({
          userId: userExists._id,
          inCart: true
        }).lean();
        return cart;
      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
    addProduct: async (
      _,
      { token, name, description, price, thumbnail, count }
    ) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
    removeProduct: async (_, { token, id }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
      { token, id, name, description, price, count, thumbnail }
    ) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
    addReview: async (_, { token, user, comment, rating, productId }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
    updateReview: async (_, { token, user, comment, rating, productId }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
    deleteReview: async (_, { token, user, productId }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
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
    },
    signUp: async (
      _,
      { name, email, password, gender, age, address, phone }
    ) => {
      try {
        if (!name || !email || !password || !gender || !age || !address) {
          throw new Error('Missing user fields!');
        }
        if (phone.length <= 10) {
          throw new Error('Please provide country code for phone number!');
        }
        let userExists = await User.findOne({ email }).lean();
        if (userExists) {
          throw new Error('User already Exists!');
        }
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        let token = await jwt.sign({ email }, process.env.SECRET, {
          expiresIn: '1h'
        });
        let date = new Date();
        let expiresIn = new Date(date.setMinutes(date.getMinutes() + 60));
        let user = new User({
          name,
          email,
          password: hash,
          gender,
          age,
          address,
          token,
          phone,
          expiresIn
        });
        const subject = 'User SignUp';
        const message = `User has been successfully created your username is ${email} and password is ${password}. You can use you email/phone for login.`;
        await user.save();
        await mailer(email, subject, message);
        return { token, expiresIn };
      } catch (err) {
        return err;
      }
    },
    updateUser: async (_, { name, token, gender, age, address, phone }) => {
      try {
        if (!name || !phone || !gender || !age || !address) {
          throw new Error('Missing user fields!');
        }
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let updatedUser = await User.findByIdAndUpdate(
          userExists._id,
          { name, phone, gender, age, address },
          { new: true }
        );
        return updatedUser;
      } catch (err) {
        return err;
      }
    },
    changePassword: async (_, { token, oldPassword, newPassword }) => {
      let decoded = await jwt.verify(token, process.env.SECRET);
      let email = decoded.email;
      let userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error('Invalid Token!');
      }
      let isValid = await bcrypt.compareSync(oldPassword, userExists.password);
      if (!isValid) {
        throw new Error("Password doesn't match!");
      }
      const subject = 'Password Change';
      const message = `Your password is changed for email user ${email} successfully. The new password is ${newPassword}`;
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPassword, salt);
      userExists.password = hash;
      await userExists.save();
      let messageId = await mailer(email, subject, message);
      return messageId;
    },
    forgotPassword: async (_, { email, newPassword }) => {
      let userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error("User doesn't exist!");
      }
      const subject = 'Forgot Password Change';
      const message = `Your password is changed for email user ${email} successfully. The new password is ${newPassword}`;
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(newPassword, salt);
      userExists.password = hash;
      await userExists.save();
      const messageId = await mailer(email, subject, message);
      return messageId;
    },
    signIn: async (_, { email, password, phone }) => {
      try {
        if ((!email || !phone) && !password) {
          throw new Error('Either email or phone with password is required!');
        }
        let params = {};
        if (email) {
          params = { email };
        }
        if (phone) {
          params = { phone };
        }
        let userExists = await User.findOne(params);
        if (!userExists) {
          throw new Error("User doesn't exist!");
        }
        let isValid = await bcrypt.compareSync(password, userExists.password);
        if (!isValid) {
          throw new Error("Password doesn't match!");
        }
        let token = await jwt.sign({ email }, process.env.SECRET, {
          expiresIn: '1h'
        });
        let date = new Date();
        let expiresIn = new Date(date.setMinutes(date.getMinutes() + 60));
        userExists.expiresIn = expiresIn;
        userExists.token = token;
        await userExists.save();
        return { token, expiresIn };
      } catch (err) {
        return err;
      }
    },
    refreshToken: async (_, { token }) => {
      try {
        let decoded = await jwt.verify(token, process.env.SECRET);
        let email = decoded.email;
        let userExists = await User.findOne({ email });
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let accessToken = await jwt.sign({ email }, process.env.SECRET, {
          expiresIn: '1h'
        });
        let date = new Date();
        let expiresIn = new Date(date.setMinutes(date.getMinutes() + 60));
        userExists.expiresIn = expiresIn;
        userExists.token = accessToken;
        await userExists.save();
        return { token: accessToken, expiresIn };
      } catch (err) {
        return err;
      }
    },
    removeUser: async (_, { token, id }) => {
      let decoded = await jwt.verify(token, process.env.SECRET);
      let email = decoded.email;
      let userExists = await User.findOne({ email });
      if (!userExists) {
        throw new Error('Invalid Token!');
      }
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User doesn't exist");
      }
      await user.remove();
      return user._id;
    },
    addItemToWishList: async (_, { token, productId }) => {
      try {
        const productExists = await Product.findById(productId).lean();
        if (!productExists) {
          throw new Error("Product doesn't exist");
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const email = decoded.email;
        const userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let wishList = new Cart({
          userId: userExists._id,
          productId,
          inWishList: true
        });
        const result = await wishList.save();
        return result;
      } catch (err) {
        return err;
      }
    },
    addItemToCart: async (_, { token, productId }) => {
      try {
        const productExists = await Product.findById(productId).lean();
        if (!productExists) {
          throw new Error("Product doesn't exist");
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const email = decoded.email;
        const userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let deliveryCharge = 100;
        const time = Math.floor(Math.random() * 10) + 1;
        if (time > 4) {
          deliveryCharge = 50;
        }
        const deliveryTime = `${time}h`;
        let wishList = new Cart({
          userId: userExists._id,
          productId,
          inCart: true,
          deliveryTime,
          deliveryCharge
        });
        const result = await wishList.save();
        return result;
      } catch (err) {
        return err;
      }
    },
    updateItemDetailsInCart: async (_, { token, productId, count }) => {
      try {
        const productExists = await Product.findById(productId).lean();
        if (!productExists) {
          throw new Error("Product doesn't exist");
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const email = decoded.email;
        const userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        let cart = await Card.findOne({
          userId: userExists._id,
          productId: productExists._id
        });
        cart.count === count;
        let result = await cart.save();
        return result;
      } catch (err) {
        return err;
      }
    },
    removeItemFromWishList: async (_, { token, cartItemId }) => {
      try {
        const wishListExists = await Cart.findById(cartItemId);
        if (!wishListExists) {
          throw new Error("Item doesn't exist in the WishList");
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const email = decoded.email;
        const userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        await wishListExists.remove();
        return wishListExists._id;
      } catch (err) {
        return err;
      }
    },
    removeItemFromCart: async (_, { token, productId }) => {
      try {
        const cardExists = await Cart.findById(cartItemId);
        if (!cardExists) {
          throw new Error("Item doesn't exist in the Cart");
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        const email = decoded.email;
        const userExists = await User.findOne({ email }).lean();
        if (!userExists) {
          throw new Error('Invalid Token!');
        }
        await cardExists.remove();
        return cardExists._id;
      } catch (err) {
        return err;
      }
    }
  },
  Subscription: {
    Products: () => {
      return Product.find().lean(); // TODO
    }
  }
};

module.exports = resolvers;
