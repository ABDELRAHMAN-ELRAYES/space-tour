import mongoose, { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'The comment must have a description'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'The comment must belongs to a post'],
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'The comment must belongs to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = model('Comment', commentSchema);

export default Comment;
