const express = require("express");
const router = express.Router();
const user = require("../models/models.users");
const hotel = require("../models/model.hotel_owner");
const restaurant = require("../models/model.restaurant_owner");
const saloon = require("../models/model.saloon_owner");
const ids = require("../models/model.ids");
const hotellist = require("../models/model.hotel_lists");
const reslist = require("../models/model.restaurant_lists");
const saloonlist = require("../models/model.saloon_lists");
const tokenoperation = require("../TokenManagement/CreateToken");
const adduser = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new user({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addhoteladmin = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new hotel({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
      hotel_owner_Id: UserData.email,
      hotel_location: UserData.address,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addrestaurantadmin = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new restaurant({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
      restaurant_owner_Id: UserData.email,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addsaloonadmin = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new saloon({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
      saloon_owner_Id: UserData.email,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addids = async function (UserData, owner) {
  return new Promise((resolve) => {
    var AddUser = new ids({
      userId: UserData.email,
      firstName: UserData.firstname,
      lastName: UserData.lastname,
      email: UserData.email,
      password: UserData.password,
      ownership: owner,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addowner = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new hotellist({
      hotel_location: UserData.address,
      hotel_owner_Id: UserData.email,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addres = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new reslist({
      restaurant_location: UserData.address,
      restaurant_owner_Id: UserData.email,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
const addsaloon = async function (UserData) {
  return new Promise((resolve) => {
    var AddUser = new saloonlist({
      saloon_location: UserData.address,
      saloon_owner_Id: UserData.email,
    });
    AddUser.save(async (err, userdoc) => {
      if (err) return console.error(err);
      resolve(console.log("Saved to user collection (SignUp)"));
    });
  });
};
router.post("/signup", (req, res) => {
  var ownership = req.body.owner;
  ids.find({ email: req.body.email }, async (err, document) => {
    if (err) {
      console.log(err, "signup failed");
      const response = {
        status: "invalid",
        message: "Server Error",
      };
      res.send(response);
    }
    if (document.length != 0) {
      const response = {
        status: "invalid",
        message: "Email exists",
      };
      res.send(response);
    } else if (document.length === 0) {
      const UserId = req.body.email;
      const Name = req.body.firstname;
      const UserData = req.body;
      console.log("Ownership", ownership);
      const token = tokenoperation.AccessAndRefreshToken(
        UserId,
        Name,
        ownership
      );
      if (ownership === "user") {
        await adduser(UserData, req.body.owner);
      } else if (ownership === "hotel") {
        await addhoteladmin(UserData, req.body.owner);
        await addowner(UserData);
      } else if (ownership === "restaurant") {
        await addrestaurantadmin(UserData, req.body.owner);
        await addres(UserData);
      } else if (ownership === "saloon") {
        await addsaloonadmin(UserData, req.body.owner);
        await addsaloon(UserData);
      }
      await addids(UserData, ownership);
      console.log("Tokens : ", token);
      const response = {
        status: "ok",
      };
      console.log("SignUp Done !!");
      res.cookie("ATC", token.AccessToken, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.cookie("RTC", token.RefreshToken, {
        maxAge: 864000000,
        httpOnly: true,
      });
      res.cookie("CTC", token.ChatToken, {
        maxAge: 864000000,
      });
      res.send(response);
    }
  });
});
module.exports = router;
