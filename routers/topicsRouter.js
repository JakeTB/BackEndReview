const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topicsControllers");
console.log(sendTopics);
console.log("MADE IT INTO TOPIC ROTUERS");
topicsRouter.get("/", sendTopics);

module.exports = { topicsRouter };
