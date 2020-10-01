const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 100
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
    review: [
      {
        comment: String,
        user: Schema.Types.ObjectId,
        rating: Number
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Product', productSchema);
