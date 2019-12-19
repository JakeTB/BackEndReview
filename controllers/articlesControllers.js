const {
  getArticleInfo,
  patchArticleInfo,
  postArticleComments,
  getArticleComments,
  getAllArticles
} = require("../models/articlesModels");

exports.sendArticleInfo = (req, res, next) => {
  const { article_id } = req.params;
  getArticleInfo(article_id)
    .then(article => {
      res.status(200).send({ articleObject: article });
    })
    .catch(next);
};
exports.updateArticleInfo = (req, res, next) => {
  const { article_id } = req.params;

  patchArticleInfo(article_id, req.body)
    .then(article => {
      res.status(201).send({ updatedArticle: article });
    })
    .catch(next);
};
exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const author = req.body.username;
  const body = req.body.body;
  postArticleComments(article_id, author, body)
    .then(comment => {
      res.status(201).send({ newComment: comment });
    })
    .catch(next);
};
exports.sendArticleComments = (req, res, next) => {
  const { sort_by } = req.query;

  const { article_id } = req.params;
  getArticleComments(article_id, sort_by)
    .then(comments => {
      res.status(200).send({ commentsArray: comments });
    })
    .catch(next);
};
exports.sendAllArticles = (req, res, next) => {
  getAllArticles()
    .then(articles => {
      res.status(200).send({ articleArray: articles });
    })
    .catch(next);
};
