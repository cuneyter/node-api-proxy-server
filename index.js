const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Create a new express application
const app = express();

// Enable CORS
app.use(cors());

// Define a route handler for the default home page
app.get("/", (req, res) => {
  console.log("req", req.headers);
  res.send("Hello World!");
});

// Start the Express server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
