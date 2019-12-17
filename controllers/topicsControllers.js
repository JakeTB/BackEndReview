const { getTopics } = require("../models/topicsModels");

exports.sendTopics = (req, res, next) => {
  console.log("INSIDE THE CONTROLLER");
  getTopics()
    .then(topicsResponse => {
      res.status(200).send({topics:topicsResponse})

    })
    .catch(error => {
      console.log(error);
    });
};
