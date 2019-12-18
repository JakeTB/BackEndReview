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
  const { inc_votes } = req.body;

  patchArticleInfo(article_id, inc_votes).then(article => {
    res.status(201).send({ updatedArticle: article });
  });
};
exports.createArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const author = req.body.username;
  const body = req.body.body;
  postArticleComments(article_id, author, body).then(comment => {
    res.status(201).send({ newComment: comment });
  });
};
exports.sendArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  getArticleComments(article_id).then(comments => {
    res.status(200).send({ commentsArray: comments });
  });
};
exports.sendAllArticles = (req, res, next) => {
  getAllArticles().then(articles => {
    res.status(200).send({ articleArray: articles });
  });
};
