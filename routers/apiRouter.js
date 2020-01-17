const apiRouter = require("express").Router();
const { topicsRouter } = require("../routers/topicsRouter");
const { usersRouter } = require("../routers/usersRouters");
const { articlesRouter } = require("../routers/articlesRouters");
const { commentsRouter } = require("../routers/commentsRouters");
const { sendAllEndpoints } = require("../controllers/apiControllers");
const { Error405 } = require("../errors");
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
  .route("/")
  .get(sendAllEndpoints)
  .all(Error405);
module.exports = { apiRouter };
