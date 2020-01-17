const connection = require("../db/connection");
exports.getUserInformation = username => {
  return connection
    .select("*")
    .from("user")
    .where({ username })
    .then(response => {
      if (!response.length) {
        return Promise.reject({
          status: 404,
          message: "No user found for that user id"
        });
      }
      return response;
    });
};
