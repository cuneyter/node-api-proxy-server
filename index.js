const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Create a new express application
const app = express();

// Enable CORS
app.use(cors());

// Routes
app.use("/", require("./routes"));

// Start the Express server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
