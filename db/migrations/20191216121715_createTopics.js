exports.up = function(knex) {
  console.log("creating topics table");
  return knex.schema.createTable("topic", topicTable => {
    topicTable.string("slug").primary();
    topicTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  console.log("removed the topics table");
  return knex.schema.dropTable("topic");
};
