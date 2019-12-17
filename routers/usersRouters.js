const usersRouter = require("express").Router();
const {sendUserInformation} = require("../controllers/usersControllers")
usersRouter.get("/", sendUserInformation);

module.exports = { usersRouter };
