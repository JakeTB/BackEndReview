exports.customErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ message: err.message });
  else next(err);
};
exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = {
    "22P02": { status: 400, message: "Bad Request" },
    "23503": { status: 400, message: "Bad request, id does not exsist" }
  };

  if (Object.keys(psqlCodes).includes(err.code)) {
    const { status, message } = psqlCodes[err.code];
    res.status(status).send({ message });
  }
  next(err);
};

exports.Error405 = (req, res, next) => {
  res.status(405).send({ message: "Method not found" });
};
