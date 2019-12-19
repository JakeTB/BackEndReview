const express = require("express");
const app = express();
const { apiRouter } = require("./routers/apiRouter");
const { customErrors, psqlErrors } = require("./errors");
app.use(express.json());
app.use("/api", apiRouter);

app.use(customErrors);

app.use(psqlErrors);

app.all("/*", (req, res, next) =>
  res.status(404).send({ message: "Route not found" })
);
module.exports = { app };
