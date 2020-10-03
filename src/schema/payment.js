const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 40,
      unique: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    itemIds: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    totalPayable: {
      type: Number,
      required: true
    },
    totalDiscount: {
      type: String,
      default: 'N/A'
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
