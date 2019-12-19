const connection = require("../db/connection");
exports.getArticleInfo = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id })
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 404,
          message: `No article found for article id ${article_id}`
        });
      }
      return response;
    });
};
exports.patchArticleInfo = (article_id, body) => {
  if (Object.keys(body).includes("inc_votes")) {
    const { inc_votes } = body;
    return connection
      .increment("votes", inc_votes)
      .from("articles")
      .where({ article_id })
      .returning("*")
      .then(response => {
        if (!response.length) {
          return Promise.reject({
            status: 404,
            message: `No article found for article id ${article_id}`
          });
        }
        return response;
      });
  } else {
    return Promise.reject({
      status: 400,
      message: `Malformed or incorrect body`
    });
  }
};
exports.postArticleComments = (article_id, author, body) => {
  const insertObj = { article_id, author, body };
  if (!author && !body) {
    return Promise.reject({
      status: 400,
      message: "Empty post"
    });
  }
  if (!author) {
    return Promise.reject({
      status: 400,
      message: "No author"
    });
  }
  if (!body) {
    return Promise.reject({
      status: 400,
      message: "No body"
    });
  }
  return connection("comments")
    .insert(insertObj)
    .returning("*")
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 400,
          message: `No article found for article id ${article_id}`
        });
      }
      return response;
    });
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
