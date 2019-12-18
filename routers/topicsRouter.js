const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topicsControllers");
topicsRouter.route("/").get(sendTopics);

module.exports = { topicsRouter };
