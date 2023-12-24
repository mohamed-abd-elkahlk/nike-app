class ApiError extends Error {
  constructor(messge, statusCode) {
    super(messge);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fial" : "error";
  }
}

module.exports = ApiError;
