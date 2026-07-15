import mongoose, { Document, Schema, model } from "mongoose";

export interface Iuser extends Document {
  email: string;
  password?: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  emailVerified?: boolean;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullName: String,
    avatarUrl: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<Iuser>("User", userSchema);
export default UserModel;
