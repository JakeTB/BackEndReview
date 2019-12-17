const { getTopics } = require("../models/topicsModels");

exports.sendTopics = (req, res, next) => {
  console.log("INSIDE THE CONTROLLER");
  getTopics()
    .then(topics => {
      console.log(topics);
    })
    .catch(error => {
      console.log(error);
    });
};
