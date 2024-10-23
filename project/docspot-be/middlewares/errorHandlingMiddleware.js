exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;

  res
    .status(statusCode)
    .json({
      message: {
        status: false,
        message: err.message || "An Unexpected Error Occured",
      },
      error: [],
      status: statusCode,
    });
};
