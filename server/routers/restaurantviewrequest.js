const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const router = express.Router();
const restaurant = require("../models/model.restaurant_lists");

function getdata(data) {
  console.log(data);
  return new Promise((resolve) => {
    resolve(
      restaurant.find({ restaurant_owner_Id: data }, (err, document) => {
        if (err) {
          console.log(err);
          return 0;
        } else {
          console.log(document);
          return document;
        }
      })
    );
  });
}
router.get("/restaurantviewrequest", async (req, res) => {
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
      var decoded = await payloadoperation.payload(access);
      if (Validity == true && decoded.payload.ownership !== "user") {
        var data = await getdata(decoded.payload.id);
        console.log("View data : ", data[0].orders[0]);
        const response = {
          status: "ok",
          message: "Access Granted",
          ownership: decoded.payload.ownership,
          data: data[0].orders,
        };
        res.send(response);
      } else {
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
