const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saloon_lists_Schema = new Schema(
  {
    saloon_location: { type: String, required: true },
    saloon_owner_Id: { type: String, required: true },
    orders: [
      {
        customer_id: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("saloon_lists", saloon_lists_Schema);
module.exports = content;
