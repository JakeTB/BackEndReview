const connection = require("../db/connection");
exports.getAllEndpoints = () => {
  return connection.select("*").from("articles");
};
