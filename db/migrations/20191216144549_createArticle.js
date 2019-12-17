exports.up = function(knex) {
  console.log("creating article table");
  return knex.schema.createTable("articles", articleTable => {
    articleTable.increments("article_id").primary();
    articleTable.string("title").notNullable();
    articleTable.text("body").notNullable();
    articleTable.integer("votes").defaultTo(0);
    articleTable.string("topic").references("topic.slug");
    articleTable.string("author").references("user.username");
    articleTable.string("created_at");
  });
};

exports.down = function(knex) {
  console.log("removed the article table");
  return knex.schema.dropTable("articles");
};
