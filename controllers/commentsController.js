const { patchComment, deleteComment } = require("../models/commentsModels");

exports.updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  patchComment(comment_id, inc_votes)
    .then(response => {
      let comment = response[0];
      res.status(200).send({ comment });
    })
    .catch(next);
};
exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
