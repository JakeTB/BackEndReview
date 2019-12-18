const { getUserInformation } = require("../models/usersModels");

exports.sendUserInformation = (req, res, next) => {
  const { username } = req.params;
  getUserInformation(username)
    .then(user => {
      res.status(200).send({ userInfo: user });
    })
    .catch(next);
};
