const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Create a new express application
const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.set("trust proxy", 1);

// Enable CORS
app.use(
  cors({
    origin: `http://${HOST}:8080`,
  })
);

// Set static folder
// app.use("/home", express.static("public")); // http://localhost:3000/home/index.html can be given different path
app.use(express.static("public"));

// Routes
app.use("/", require("./routes"));

// Start the Express server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
