const apiRouter = require("express").Router();
const { topicsRouter } = require("../routers/topicsRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter)
module.exports = { apiRouter };
