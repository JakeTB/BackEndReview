const articlesRouter = require("express").Router();
const {
  sendArticleInfo,
  updateArticleInfo,
  createArticle
} = require("../controllers/articlesControllers");
articlesRouter
  .route("/:article_id")
  .get(sendArticleInfo)
  .patch(updateArticleInfo)
  .post(createArticle);

module.exports = { articlesRouter };
