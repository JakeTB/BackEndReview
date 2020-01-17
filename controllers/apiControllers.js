const { getAllEndpoints } = require("../models/apiModels");

exports.sendAllEndpoints = (req, res, next) => {
  res.sendStatus(200);
};
