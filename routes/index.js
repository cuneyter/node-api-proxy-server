const express = require("express");
const url = require("url");
const router = express.Router();
const needle = require("needle");

// ENV variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const createParams = (reqUrl) => {
  return new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...url.parse(reqUrl, true).query,
  });
};

const makeApiRequest = async (params) => {
  const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
  return apiResponse.body;
};

router.get("/", (req, res) => {
  res.send("App is working");
});

router.get("/api", async (req, res) => {
  try {
    const params = createParams(req.url);
    const data = await makeApiRequest(params);

    // Log the request to the console
    if (process.env.NODE_ENV !== "production") {
      console.log(`GET: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
