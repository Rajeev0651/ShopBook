const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const https = require("https");
app.use(cookieparser());
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(express.json());
const loginRoute = require("./routers/login");
const signupRoute = require("./routers/signup");
const homeRoute = require("./routers/home");
const logoutRoute = require("./routers/logout");
const hotelbook = require("./routers/hotelbooking");
const resbook = require("./routers/restaurantbooking");
const saloonbook = require("./routers/saloonbooking");
const hotelview = require("./routers/hotelviewrequest");
const resview = require("./routers/restaurantviewrequest");
const saloonview = require("./routers/saloonviewrequest");
const hoteldetetequery = require("./routers/hoteldelete");
const resdetetequery = require("./routers/restaurantdelete");
const saloondetetequery = require("./routers/saloondetete");

dotenv.config();
const uri = process.env.ATLAS_URI;

const options = {
  key: fs.readFileSync("../SSL/privatekey.pem"),
  cert: fs.readFileSync("../SSL/certificate.pem"),
};

async function DatabaseConnection() {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    const connection = mongoose.connection;
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", () => {
      console.log("connection established");
    });
  } catch (err) {
    console.log(err);
  }
}
DatabaseConnection();

app.use(homeRoute);
app.use(loginRoute);
app.use(signupRoute);
app.use(hotelbook);
app.use(hotelview);
app.use(hoteldetetequery);
app.use(resbook);
app.use(saloonbook);
app.use(resview);
app.use(saloonview);
app.use(resdetetequery)
app.use(saloondetetequery)
//app.use(logoutRoute);
const PORT = process.env.PORT || 5000;
const server = https.createServer(options, app).listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
//console.log(client);
