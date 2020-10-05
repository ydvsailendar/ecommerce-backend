const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
      unique: true
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
    ],
    discount: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      enum: [
        'Men',
        'Fashion',
        'Trend',
        'Daily',
        'Footwear',
        'Shirt',
        'Pant',
        'Appliance',
        'Accessority',
        'Phone',
        'Lactop',
        'Case',
        'Watch',
        'Cooker',
        'Speaker',
        'Monitor',
        'Women',
        'Inner',
        'Outer',
        'Cover',
        'Ti-Shirt',
        'Bra',
        'Panty',
        'Grown',
        'Camera',
        'Bottle',
        'Cup',
        'Fan',
        'LED',
        'Soap',
        'Shampoo',
        'Cream',
        'Powder',
        'WashingMachine',
        'Cooler',
        'AC',
        'Bulb',
        'Mouse',
        'Keyboard',
        'Sticker',
        'Headphone',
        'Earphone',
        'Bluetooth',
        'Book',
        'Pen',
        'Pencil',
        'Notebook',
        'Calculator',
        'Charger',
        'Battery',
        'Refrigirator',
        'Chair',
        'Table',
        'Desk',
        'Wall',
        'Bag'
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
