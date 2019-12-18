const express = require("express");
const app = express();
const { apiRouter } = require("./routers/apiRouter");
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "My Server Error" });
});
app.all("/*", (req, res, next) =>
  res.status(404).send({ message: "Route not found" })
);
module.exports = { app };
