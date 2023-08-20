import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connected Successfully 💥");
    })
    .catch(() => {
      console.log("DB Failed to connect 🚫");
    });
};
