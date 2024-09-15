import { Schema, model } from 'mongoose';

const ExoplanetSchema = new Schema({
    name: {
      type: String
    },
    habitability: {
      type: Boolean
    },
    semiMajorAxis: {
      type: Number
    },
    orbitalPeriod: {
      type: Number
    },
    mass: {
      type: Number
    },
    radius: {
      type: Number
    },
    density: {
      type: Number
    },
    star: [
      {
        type: Schema.Types.ObjectId,
        ref: "Star"
      }
    ]
  });
  
  const Exoplanet = model("Exoplanet", ExoplanetSchema);
  export default Exoplanet;