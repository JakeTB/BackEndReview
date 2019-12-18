const articlesRouter = require("express").Router();
const {
  sendArticleInfo,
  updateArticleInfo,
  createArticleComment,
  sendArticleComments,
  sendAllArticles
} = require("../controllers/articlesControllers");
articlesRouter
  .route("/:article_id")
  .get(sendArticleInfo)
  .patch(updateArticleInfo);
articlesRouter
  .route("/:article_id/comments")
  .get(sendArticleComments)
  .post(createArticleComment);
articlesRouter.route("/").get(sendAllArticles);
module.exports = { articlesRouter };
