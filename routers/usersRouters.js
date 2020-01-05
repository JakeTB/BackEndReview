const usersRouter = require("express").Router();
const { sendUserInformation } = require("../controllers/usersControllers");
const { Error405 } = require("../errors");
usersRouter.route("/:username").get(sendUserInformation).all(Error405);

module.exports = { usersRouter };
