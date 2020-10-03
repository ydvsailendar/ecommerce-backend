const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 100
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Others']
    },
    phone: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 15,
      unique: true
    },
    age: {
      type: Number,
      required: true,
      min: 10
    },
    token: {
      type: String,
      required: true
    },
    expiresIn: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
