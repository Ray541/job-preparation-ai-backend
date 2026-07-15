import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { verifyToken } from "../utils/authUtils.js";
import UserModel from "../models/user.model.js";

// Extend Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the token from cookies
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError(
        "You are not logged in. Please log in to get access.",
        401
      );
    }

    // Verify the token
    // If the token is invalid or expired, jwt.verify will throw an error
    // catchAsync will catch it and send it to your globalErrorHandler
    const decoded = verifyToken(token) as {
      id: string;
      iat: number;
      exp: number;
    };

    // Check if user still exists in the database
    const currentUser = await UserModel.findById(decoded.id);
    if (!currentUser) {
      throw new AppError(
        "The user belonging to this token no longer exists.",
        401
      );
    }

    // Attach user to the request so controllers can use it
    req.user = currentUser;

    next();
  }
);
