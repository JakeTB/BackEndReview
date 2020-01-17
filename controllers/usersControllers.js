const { getUserInformation } = require("../models/usersModels");

exports.sendUserInformation = (req, res, next) => {
  const { username } = req.params;
  getUserInformation(username)
    .then(response => {
      let user = response[0];
      res.status(200).send({ user });
    })
    .catch(next);
};
