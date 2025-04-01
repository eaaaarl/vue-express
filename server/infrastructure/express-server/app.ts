import express from "express";
import cors from "cors";
import authRoute from "../../auth/auth.route";
import { errorHandler } from "../middleware/errorHandler.middleware";

export const startServer = () => {
  const app = express();

  // Security Middleware
  app.use(cors());

  // Body Parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Core Routes
  app.use("/api/auth", authRoute);

  //Error handling
  app.use(errorHandler);

  return app;
};
