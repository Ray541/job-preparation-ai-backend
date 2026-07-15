import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { CookieOptions } from "express";

/**
 * Function to sign token
 * @param payload Payload to sign
 * @param expiresIn Expiration time (Default: 7 days)
 * @default expiresIn "7d"
 * @returns Signed token
 */
export const signToken = (payload: object, expiresIn: string = "7d") => {
  return jwt.sign(payload, config.JWT_SECRET as string, { expiresIn } as any);
};

/**
 * Verifies a JWT token
 * @param token Token to verify
 * @returns Decoded token payload
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET as string);
};

/**
 * Function to get cookie options
 * @param isLogOut Boolean to check if cookie should be deleted (Default: false)
 * @default isLogOut false
 * @returns Cookie options
 */
export const getCookieOptions = (isLogOut: boolean = false): CookieOptions => {
  const isProduction = config.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    ...(isLogOut
      ? { expires: new Date(0) }
      : { maxAge: 7 * 24 * 60 * 60 * 1000 }), // 7 Days
  };
};
