const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    inWishList: {
      type: Boolean,
      default: false
    },
    inCart: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1,
      min: 1
    },
    deliveryCharge: {
      type: Number,
      default: 0,
      min: 0
    },
    deliveryTime: {
      type: String,
      default: 'N/A'
    },
    deliveryStatus: {
      type: String,
      default: 'N/A',
      enum: ['DELIVERED', 'CANCELLED', 'REFUNDED', 'INPROGRESS', 'N/A']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cart', cartSchema);
