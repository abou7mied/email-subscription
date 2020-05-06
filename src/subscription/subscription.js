const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  expireAt: {
    type:Number,
    required: true,
  }
});

subscriptionSchema.index({
  email: 1,
}, { unique: true });


module.exports = mongoose.model('Subscription', subscriptionSchema);
