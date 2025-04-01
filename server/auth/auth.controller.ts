import { NextFunction, Request, Response } from "express";
import { AuthService } from "./core/service/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const signInPayload = req.body;
      const loggeInUser = await this.authService.signIn(signInPayload);

      res.status(200).json({
        message: "You have successfully signed in",
        user: loggeInUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpData = req.body;
      const newUser = await this.authService.signUp(signUpData);

      res.status(201).json({
        message: "Congratulations, your account has been registered",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
