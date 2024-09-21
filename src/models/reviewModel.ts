import mongoose, { Schema, model } from 'mongoose';
import { iReview } from '../interfaces/iReview';
import Draw from './drawModel';

const reviewSchema = new Schema({
  review: {
    type: String,
    required: [true, 'The review must have a description'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  tour: {
    ref: 'Draw',
    type: Schema.ObjectId,
  },
  user: {
    ref: 'User',
    type: Schema.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

reviewSchema.statics.calculateRatings = async function (tourId: string) {
  const reviews = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: 'rating' },
      },
    },
  ]);

  if (reviews.length > 0) {
    await Draw.findByIdAndUpdate(tourId, {
      ratingsAverage: reviews[0].ratingsAverage,
      ratingsQuantity: reviews[0].ratingsQuantity,
    });
  } else {
    await Draw.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};
reviewSchema.post<iReview>('save', function () {
  (this.constructor as any).calculateRatings(this.tour);
});
const Review = model('Review', reviewSchema);

export default Review;