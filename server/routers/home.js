const express = require("express");
const tokenoperation = require("../TokenManagement/VerifyToken");
const payloadoperation = require("../TokenManagement/GetPayload");
const router = express.Router();

router.get("/", async (req, res) => {
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
        var decoded = await payloadoperation.payload(access);
        console.log(decoded, "Decoded")
        const response = {
          status: "ok",
          message: "Access Granted",
          ownership: decoded.payload.ownership,
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
