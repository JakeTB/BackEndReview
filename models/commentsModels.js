const connection = require("../db/connection");

exports.patchComment = (comment_id, inc_votes) => {
  return connection
    .increment("votes", inc_votes)
    .from("comments")
    .where({ comment_id })
    .returning("*");
};

exports.deleteComment = comment_id => {
  console.log(comment_id);
  return connection("comments")
    .where({ comment_id })
    .del();
};
