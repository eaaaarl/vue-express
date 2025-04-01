import dotenv from "dotenv";

dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  bcryptSaltRounds: 10,
  databaseUrl: process.env.DATABASE_URL,
};
