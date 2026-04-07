const mongoose = require("mongoose");

//! connecting to mongoose
function connectDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.log(
      "MongoDB URI is missing. Set MONGODB_URI in your backend .env file.",
    );
    return;
  }

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("mongoose Connected");
    })
    .catch((err) => {
      console.log("Error while connecting to MongoDB", err);
    });
}

module.exports = connectDB;
