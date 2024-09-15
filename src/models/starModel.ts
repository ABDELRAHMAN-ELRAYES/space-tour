import { Schema, model } from 'mongoose';

const StarSchema = new Schema({
  name: {
    type: String,
  },
  mass: {
    type: Number,
  },
  effTemp: {
    type: Number,
  },
  radius: {
    type: Number,
  },
  exoplanet: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exoplanet',
    },
  ],
});

const Star = model('Star', StarSchema);
export default Star;
