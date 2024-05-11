const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/api", (req, res) => {
  res.json({ success: true, message: "API is working" });
});

module.exports = router;
