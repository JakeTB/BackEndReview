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
      res.status(200).send({ article });
    })
    .catch(next);
};
exports.updateArticleInfo = (req, res, next) => {
  const { article_id } = req.params;

  patchArticleInfo(article_id, req.body)
    .then(article => {
      res.status(200).send({ article });
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
  const { article_id } = req.params;
  getArticleComments(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
exports.sendAllArticles = (req, res, next) => {
  getAllArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
