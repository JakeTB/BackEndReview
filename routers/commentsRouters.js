const commentsRouter = require("express").Router();
const {
  updateComment,
  removeComment
} = require("../controllers/commentsController");
commentsRouter
  .route("/:comment_id")
  .patch(updateComment)
  .delete(removeComment);

module.exports = { commentsRouter };
