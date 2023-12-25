// Package Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();
const router = require("./src/routes/api");
const notFound = require("./src/middlewares/notFound");
const globalErrorHandler = require("./src/middlewares/globalErrorHandler");

// express app instance
const app = express();

// Security Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

// Health API
app.get("/", (req, res) => {
  res.status(200).send("Edujar LMS REST API: All is Well");
});

// catch all route
app.use(notFound);
// global error handler
app.use(globalErrorHandler);

// Exports
module.exports = app;
