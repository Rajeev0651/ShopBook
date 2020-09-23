const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const all_ids_Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userId: { type: String, required: true },
    ownership: { type: String, required: true },
  },
  { timestamps: true }
);

const user = mongoose.model("all_ids", all_ids_Schema);

module.exports = user;
