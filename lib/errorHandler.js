'use strict';

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.json({
    error: err,
  });
};

module.exports = errorHandler;
