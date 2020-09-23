const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotel_lists_Schema = new Schema(
  {
    hotel_location: { type: String, required: true },
    hotel_owner_Id: { type: String, required: true },
    orders: [
      {
        customer_id: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: Date, required: true },
        checkin: { type: Date, required: true },
        checkout: { type: Date, required: true },
        room: { type: Number, required: true },
        adult: { type: Number, required: true },
        children: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("hotel_lists", hotel_lists_Schema);
module.exports = content;
