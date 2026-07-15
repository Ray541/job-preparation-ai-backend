import { NextFunction, Request, Response } from "express";
import config from "../config/config.js";

/**
 * Global error handler middleware
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isProduction = config.NODE_ENV === "production";

  console.error("ERROR:", {
    message: err.message,
    stack: err.stack,
  });

  let statusCode = err.statusCode || 500;
  let message = err instanceof Error ? err.message : "Internal Server Error";

  // Catch Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  // Catch Mongoose Duplicate Key (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists. Please use another value.`;
    statusCode = 409;
  }

  // Catch Mongoose Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    message = `Invalid input data. ${errors.join(". ")}`;
    statusCode = 400;
  }

  // Catch JWT Errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again!";
    statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    message = "Your token has expired! Please log in again.";
    statusCode = 401;
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    error: !isProduction ? err.stack : undefined,
  });
};
