const apiRouter = require("express").Router();
const { topicsRouter } = require("../routers/topicsRouter");
const { usersRouter } = require("../routers/usersRouters");
const { articlesRouter } = require("../routers/articlesRouters");
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
module.exports = { apiRouter };
