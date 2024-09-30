import mongoose, { Schema, model, mongo } from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: [true, 'this post must belong to a user'],
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    photo: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, 'this like must belong to a user'],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (this: any, next) {
  this.populate({ path: 'user', select: 'photo name' });
  next();
});
const Post = model('Post', postSchema);

export default Post;
