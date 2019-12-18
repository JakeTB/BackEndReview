const { getTopics } = require("../models/topicsModels");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then(topicsResponse => {
      res.status(200).send({ topics: topicsResponse });
    })
    .catch(error => {
      console.log(error);
    });
};
