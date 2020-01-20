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
    const { inc_votes = 0 } = body;
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
  console.log("Here");
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
      console.log(response, "<<<<<<RESPONSE");
      if (!response.length) {
        console.log("REJECTED");
        return Promise.reject({
          status: 404,
          message: `No article found for article id ${article_id}`
        });
      }
      return response;
    });
};

exports.getArticleComments = (article_id, query) => {
  const { sort_by, order } = query;
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .orderBy(sort_by || "created_at", order || "desc");
};
exports.getAllArticles = query => {
  const { sort_by, order, author, topic } = query;

  if (author) {
    return connection
      .select("*")
      .from("articles")
      .where("author", author)

      .orderBy(sort_by || "created_at", order || "desc");
  }
  if (topic) {
    return connection
      .select("*")
      .from("articles")
      .where("topic", topic)
      .orderBy(sort_by || "created_at", order || "desc");
  }

  return connection
    .select("*")
    .from("articles")
    .orderBy(sort_by || "created_at", order || "desc");
};
