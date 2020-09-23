const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurant_owner_Schema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    restaurant_owner_Id: { type: String, required: true },
    bookings: [
      {
        restaurant_name: { type: String, required: true },
        restaurant_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("restaurant_owners", restaurant_owner_Schema);
module.exports = content;
