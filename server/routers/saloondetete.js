const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const router = express.Router();
const saloon = require("../models/model.saloon_lists");

function getdata(data, delete_id) {
  console.log("Deletion : ", data, delete_id);
  return new Promise((resolve) => {
    resolve(
      saloon.updateOne(
        { saloon_owner_Id: data },
        { $pull: { orders: { customer_id: delete_id } } },
        (err, document) => {
          if (err) {
            console.log(err);
          } else {
            console.log(document);
          }
        }
      )
    );
  });
}
router.post("/saloondelete", async (req, res) => {
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
      console.log("Delete data : ", req.body);
      Validity = await tokenoperation.AccessAndRefreshToken(refresh, access);
      var decoded = await payloadoperation.payload(access);
      if (Validity == true) {
        await getdata(decoded.payload.id, req.body.id);
        const response = {
          status: "ok",
          message: "Access Granted",
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
