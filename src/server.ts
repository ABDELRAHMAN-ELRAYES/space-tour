import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const DB = <string>process.env.DATABASE || 'mongodb://localhost:27017/natours';

mongoose.connect(DB).then(() => {
  console.log(`DB is connected successfully`);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`[server] is listening at port ${port}`);
});
