/**
 * Custom error class for operational errors
 * @param message - The error message
 * @param statusCode - The status code
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
