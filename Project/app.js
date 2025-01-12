const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const timeout = require("connect-timeout");
const connectDB = require("./src/config/db");
const taskRoutes = require("./src/routes/taskRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const helmet = require("helmet"); // for additional security headers

dotenv.config();
connectDB();

const app = express();

// Logging middleware
app.use(morgan("dev")); // Logs all incoming requests

// Security middleware
app.use(helmet()); // Set various HTTP headers to enhance security

// Set request timeout (5 seconds for demo purposes)
app.use(timeout("5s"));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Body parser middleware
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Error handling middleware
app.use(errorHandler);

// Server listening on port 8000
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
