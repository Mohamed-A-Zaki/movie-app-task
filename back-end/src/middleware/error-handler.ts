import { ErrorRequestHandler } from "express";

/**
 * Error handler for handling errors in the API.
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
