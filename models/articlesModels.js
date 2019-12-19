const connection = require("../db/connection");
exports.getArticleInfo = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id });
};
exports.patchArticleInfo = (article_id, inc_votes) => {
  return connection
    .increment("votes", inc_votes)
    .from("articles")
    .where({ article_id })
    .returning("*");
};
exports.postArticleComments = (article_id, author, body) => {
  const insertObj = { article_id, author, body };

  return connection("comments")
    .insert(insertObj)
    .returning("*");
};

exports.getArticleComments = (article_id, sort_by) => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", "desc");
};
exports.getAllArticles = () => {
  return connection.select("*").from("articles");
};
