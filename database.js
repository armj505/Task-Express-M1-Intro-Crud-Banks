// import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

// connnect to mongoose
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("CONNECTED TO THE DATABASE");
  } catch (error) {
    console.log("NOT CONNECTED TO THE DATABASE");
  }
};

module.exports = mongoDB;
