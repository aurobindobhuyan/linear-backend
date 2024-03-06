import mongoose from "mongoose";

export const connectMongoDb = () => {
  return mongoose.connect(process.env.DB_URL);
};

export const mongoDB = mongoose.connection.on("error", (err) => {
  console.error.bind(console, "connection error:", err);
});
