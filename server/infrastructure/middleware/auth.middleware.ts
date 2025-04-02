import { NextFunction, Response } from "express";
import { AuthService } from "../../auth/core/service/auth.service";
import { CustomRequest, SafeUser } from "./type";

export class AuthMiddleware {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async protectRoute(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        res.status(401).json({ error: "No token was provided" });
      }

      const user = await this.authService.validateToken(token);

      if (!user) {
        res.status(401).json({ error: "Invalid or token expired" });
      }
      req.user = user as SafeUser;
      next();
    } catch (error) {
      console.error("Authentication middleware error:", error);
      return res
        .status(401)
        .json({ error: "Authentication failed at the middleware" });
    }
  }
}
