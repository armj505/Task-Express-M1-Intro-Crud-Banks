const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const accountSchema = new Schema({
  username: { type: String, required: true },
  funds: { type: Number, default: 0 },
});

module.exports = model("Account", accountSchema);
