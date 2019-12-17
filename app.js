const express = require("express");
const app = express();
const { apiRouter } = require("./routers/apiRouter");

app.use("/api", apiRouter);

module.exports = { app };
