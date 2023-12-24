const glopalError = (err, res, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).josn({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = glopalError;
