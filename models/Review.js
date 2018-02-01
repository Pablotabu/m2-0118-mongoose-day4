const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ReviewSchema = new Schema({
  product : Schema.Types.ObjectId,
  stars: Number
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;