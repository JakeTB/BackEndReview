const {
  getArticleInfo,
  patchArticleInfo,
  postArticle
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
  console.log(req.body);
  patchArticleInfo(article_id, inc_votes).then(article => {
    console.log(article);
    res.status(201).send({ updatedArticle: article });
  });
};
exports.createArticle = (req, res, next) => {
  postArticle().then(() => {
    res.sendStatus(201);
  });
};
