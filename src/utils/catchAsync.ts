import { NextFunction, Request, Response } from "express";

/**
 * Catches any async errors and passes them to the error handler
 * @param fn Async function to catch errors from
 * @returns Async function with error handling
 */
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
