import { config } from "../infrastructure/config/env.config";
import jwt from "jsonwebtoken";
interface DecodedToken {
  userId: number;
}

export const verifyToken = (token: string): DecodedToken => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not set in the environment variables");
  }

  return jwt.verify(token, config.jwtSecret) as DecodedToken;
};
