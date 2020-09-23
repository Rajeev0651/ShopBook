const router = require("express").Router();

router.get("/logout", async(req, res) => {
  var client = data.key[0];
  await client.flushall("ASYNC", () => {
    console.log("Redis DB cleared");
  });
  const response = {
    status: "ok",
  };
  res.cookie("ATC", 0, {
    maxAge: 0,
    httpOnly: true,
  });
  res.cookie("RTC", 0, {
    maxAge: 0,
    httpOnly: true,
  });
  res.send(response);
});

module.exports = router;
