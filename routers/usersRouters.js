const usersRouter = require("express").Router();
const { sendUserInformation } = require("../controllers/usersControllers");
usersRouter.route("/:username").get(sendUserInformation);

module.exports = { usersRouter };
