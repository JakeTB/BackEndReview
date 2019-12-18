const connection = require("../db/connection");
exports.getUserInformation = username => {
  return connection
    .select("*")
    .from("user")
    .where({ username });
};
