const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saloon_owner_Schema = new Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    saloon_owner_Id: { type: String, required: true },
    bookings: [
      {
        saloon_name: { type: String, required: true },
        saloon_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const content = mongoose.model("saloon_owners", saloon_owner_Schema);
module.exports = content;
