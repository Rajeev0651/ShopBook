const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const hotel = require("../models/model.hotel_lists");
const router = express.Router();

function bookroom(data) {
  console.log("Chiildren : ",data.children)
  return new Promise((resolve) => {
    var obt;
    console.log("My Location : ",data.location)
    hotel.findOneAndUpdate(
      { hotel_location: data.location },
      {
        $push: {
          orders: {
            customer_id: data.name,
            location: data.location,
            date: "1",
            checkin: data.checkin,
            checkout: data.checkout,
            room: data.room,
            adult: data.adult,
            children: data.children,
          },
        },
      },
      { upsert: true, new: true },
      async (err, doc) => {
        console.log(doc, "Content inserted sccessfully !!");
        resolve(obt);
      }
    );
  });
}

router.post("/hotelbooking", async (req, res) => {
  var Validity = false;
  const access = req.cookies.ATC;
  const refresh = req.cookies.RTC;
  if (access == undefined || refresh == undefined) {
    const response = {
      status: "invalid",
      message: "Token not present",
    };
    res.send(response);
  } else {
    try {
      Validity = await tokenoperation.AccessAndRefreshToken(refresh, access);
      if (Validity == true) {
        console.log("Room booking request : ", req.body);
        bookroom(req.body);
      } else {
        console.log(response);
        const response = {
          status: "invalid",
          message: "Access decline",
        };
        res.send(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
