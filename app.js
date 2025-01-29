const express = require("express");
const app = express();

const postRoute = require("./routes/post");
const droneRoute = require('./routes/drone');
const medicationRoute = require('./routes/medication');
const fleetRoutes = require('./routes/fleets');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes
app.use("/post", postRoute);
app.use("/drone", droneRoute);
app.use('/medication', medicationRoute);
app.use('/fleets', fleetRoutes);

module.exports = app;
