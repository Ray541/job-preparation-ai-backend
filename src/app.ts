import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "./config/config.js";
// Routes imports
import authRouter from "./routes/auth.routes.js";
// Global Error Handler
import { globalErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Allow Origin
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
if (config.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send(`API is running on ${config.PORT}...`);
});
app.use("/api/auth", authRouter);

// GLOBAL ERROR HANDLER MUST BE AT THE END
app.use(globalErrorHandler);

export default app;
