const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const saloon = require("../models/model.saloon_lists");
const router = express.Router();

function bookroom(data) {
  return new Promise((resolve) => {
    var obt;
    saloon.findOneAndUpdate(
      { saloon_location: data.location },
      {
        $push: {
          orders: {
            customer_id: data.name,
            location: data.location,
            date: data.date,
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

router.post("/saloonbooking", async (req, res) => {
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
        bookroom(req.body);
        const response = {
          status: "ok",
          message: "Booked !!",
        };
        res.send(response);
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
