const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topicsControllers");
const { Error405 } = require("../errors");
topicsRouter
  .route("/")
  .get(sendTopics)
  .all(Error405);

module.exports = { topicsRouter };
