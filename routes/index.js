const express = require("express");
const url = require("url");
const router = express.Router();
const axios = require("axios");
const apicache = require("apicache");

// ENV variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Initialize the cache
const cache = apicache.middleware;

router.get("/app", (req, res) => {
  res.send("App is working");
});

router.get("/api", cache("2 minutes"), async (req, res) => {
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

const createParams = (reqUrl) => {
  return new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...url.parse(reqUrl, true).query,
  });
};

const makeApiRequest = async (params) => {
  // const apiResponse = await needle("get", `${API_BASE_URL}?${params}`);
  // return apiResponse.body;

  const apiResponse = await axios.get(`${API_BASE_URL}?${params}`);
  return apiResponse.data;
};

module.exports = router;
