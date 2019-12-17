const connection = require("../db/connection");
exports.getTopics = () => {
  console.log("inside the model");
  return connection.select("*").from("topic");
};
