const connection = require("../db/connection");

exports.patchComment = (comment_id, inc_votes) => {
  if (!inc_votes) {
    return connection
      .from("comments")
      .where({ comment_id })
      .returning("*")
      .then(response => {
        if (!response.length) {
          return Promise.reject({
            status: 404,
            message: "No comment found for that comment_id"
          });
        }
        return response;
      });
  }
  return connection
    .increment("votes", inc_votes)
    .from("comments")
    .where({ comment_id })
    .returning("*")
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 404,
          message: "No comment found for that comment_id"
        });
      }
      return response;
    });
};

exports.deleteComment = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .del()
    .returning("*")
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 404,
          message: "No comment found for that comment_id"
        });
      }
      return response;
    });
};
