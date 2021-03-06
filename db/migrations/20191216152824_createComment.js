exports.up = function(knex) {
  return knex.schema.createTable("comments", commentTable => {
    commentTable.increments("comment_id").primary();
    commentTable.string("author").references("user.username");
    commentTable.integer("article_id").references("articles.article_id");
    commentTable.integer("votes").defaultsTo(0);
    commentTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentTable.text("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
