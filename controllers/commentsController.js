const { patchComment, deleteComment } = require("../models/commentsModels");

exports.updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  patchComment(comment_id, inc_votes)
    .then(updatedComment => {
      res.status(200).send({ comment: updatedComment });
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
