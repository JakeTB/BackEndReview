const { getTopics } = require("../models/topicsModels");

exports.sendTopics = (req, res, next) => {
  console.log("INSIDE THE CONTROLLER");
  res.status(200).send({ message: "some films here" });
};
