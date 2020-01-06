const { getAllEndpoints } = require("../models/apiModels");

exports.sendAllEndpoints = () => {
  console.log("Inside controller");
  getAllEndpoints().then();
};
