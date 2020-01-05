const commentsRouter = require("express").Router();
const {
  updateComment,
  removeComment
} = require("../controllers/commentsController");
const { Error405 } = require("../errors");
commentsRouter
  .route("/:comment_id")
  .patch(updateComment)
  .delete(removeComment).all(Error405);

module.exports = { commentsRouter };
