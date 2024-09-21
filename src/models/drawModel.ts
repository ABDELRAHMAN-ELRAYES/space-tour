import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import slugify from 'slugify';

const drawSchema = new Schema({
  ratingsAverage: {
    type: Number,
  },
  ratingsQuantity: {
    type: Number,
  },
});

const Draw = model('Draw', drawSchema);

export default Draw;
