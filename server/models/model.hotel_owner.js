const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotel_owner_Schema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hotel_owner_Id: { type: String, required: true },
    hotel_location:  { type: String, required: true },
    bookings: [
      {
        hotel_name: { type: String, required: true },
        hotel_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("hotel_owners", hotel_owner_Schema);
module.exports = content;
