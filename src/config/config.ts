import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV is not defined in environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
