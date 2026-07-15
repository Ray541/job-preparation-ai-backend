import mongoose, { Document, Schema, model } from "mongoose";

export interface IAccount extends Document {
  userId: mongoose.Types.ObjectId;
  provider: "google" | "github" | "linkedin"; // Add more as needed
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["google", "github", "linkedin"],
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    expiresAt: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Ensure a user can only link one of each provider type
accountSchema.index({ userId: 1, provider: 1 }, { unique: true });
// Optional: Ensure providerAccountId is unique per provider
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const AccountModel = model<IAccount>("Account", accountSchema);
export default AccountModel;
