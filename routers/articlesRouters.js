const articlesRouter = require("express").Router();
const {
  sendArticleInfo,
  updateArticleInfo,
  createArticleComment,
  sendArticleComments,
  sendAllArticles
} = require("../controllers/articlesControllers");
const { Error405 } = require("../errors");
articlesRouter
  .route("/:article_id")
  .get(sendArticleInfo)
  .patch(updateArticleInfo).all(Error405);
articlesRouter
  .route("/:article_id/comments")
  .get(sendArticleComments)
  .post(createArticleComment).all(Error405);
articlesRouter.route("/").get(sendAllArticles).all(Error405);
module.exports = { articlesRouter };
