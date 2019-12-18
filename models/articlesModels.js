const connection = require("../db/connection");
exports.getArticleInfo = article_id => {
  console.log("inside");
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
