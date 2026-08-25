import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";
import { successResponse } from "../utils/responseUtils.js";
import { signToken, getCookieOptions } from "../utils/authUtils.js";

export const registerController = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password, username, fullName } = req.body;

    // Validations
    if (!email) {
      throw new AppError("Email is required", 400);
    }
    if (!password) {
      throw new AppError("Password is required", 400);
    }
    if (!username) {
      throw new AppError("Username is required", 400);
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email) {
        throw new AppError("Email is already registered", 409);
      }
      throw new AppError("Username is already taken", 409);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await UserModel.create({
      email,
      username,
      password: hashedPassword,
      fullName,
    });

    // Remove password from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    // Generate JWT token
    const token = signToken({ id: newUser._id });

    // Set cookie
    res.cookie("token", token, getCookieOptions());

    return successResponse(
      res,
      201,
      "User registered successfully",
      userResponse
    );
  }
);

export const logInController = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validations
    if (!email) {
      throw new AppError("Email is required", 400);
    }
    if (!password) {
      throw new AppError("Password is required", 400);
    }

    // Check if user exists
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }

    // Remove password from the response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Generate Token
    const token = signToken({ id: user._id });

    // Set Cookie
    res.cookie("token", token, getCookieOptions());

    return successResponse(
      res,
      200,
      "User logged in successfully",
      userResponse
    );
  }
);

export const getUserPreferencesController = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;

    // Check if user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const data = user.preferences;
    console.log("data", data);

    return successResponse(
      res,
      200,
      "User preferences fetched successfully",
      data
    );
  }
);

export const updateUserPreferencesController = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;
    const { theme } = req.body;

    // Check if user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Validate preferences
    if (!theme) {
      throw new AppError("Theme is required", 400);
    }

    // Update preferences
    user.preferences.theme = theme;
    await user.save();

    // Prepare response data
    const data = user.preferences;

    return successResponse(
      res,
      200,
      "User preferences updated successfully",
      data
    );
  }
);

export const getMeController = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;

    // Check if user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const data = user;
    console.log(data);

    return successResponse(res, 200, "User fetched successfully", data);
  }
);

export const logOutController = catchAsync(
  async (req: Request, res: Response) => {
    // Delete Cookie
    res.cookie("token", "", getCookieOptions(true));

    return successResponse(res, 200, "User logged out successfully");
  }
);
