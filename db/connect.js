import mongoose from "mongoose";

const mongooseDB = (url) => {
  return mongoose.connect(url);
};
export default mongooseDB;
