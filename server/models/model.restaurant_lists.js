const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurant_lists_Schema = new Schema(
  {
    restaurant_location: { type: String, required: true },
    restaurant_owner_Id: { type: String, required: true },
    orders: [
      {
        customer_id: { type: String, required: true },
        location: { type: String, required: true },
        time: { type: Date, required: true },
        date: { type: Date, required: true },
        seats: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("restaurant_lists", restaurant_lists_Schema);
module.exports = content;
