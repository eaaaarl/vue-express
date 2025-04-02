import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "../../auth/auth.route";
import userRoute from "../../user/user.route";
import { errorHandler } from "../middleware/errorHandler.middleware";

export const startServer = () => {
  const app = express();

  // Security Middleware
  app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your Vue app URL
      credentials: true,
    })
  );

  // Body Parser
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Core Routes
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);

  //Error handling
  app.use(errorHandler);

  return app;
};
