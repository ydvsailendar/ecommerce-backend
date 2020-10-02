const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 200
    },
    thumbnail: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true,
      min: 1
    },
    stock: {
      type: Boolean,
      default: () => {
        if (this.count >= 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    price: {
      type: Number,
      required: true,
      min: 100
    },
    reviews: [
      {
        comment: String,
        user: Schema.Types.ObjectId,
        rating: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
