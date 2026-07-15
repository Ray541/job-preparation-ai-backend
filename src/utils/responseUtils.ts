import { Response } from "express";

/**
 * Function to send a standard success response
 * @param res Express response object
 * @param statusCode Status code of the response
 * @param message Message to be sent to the client
 * @param data Data sent to the client
 */
export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: object
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};
