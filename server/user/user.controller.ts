import { NextFunction, Response } from "express";
import { CustomRequest } from "../infrastructure/middleware/type";
import { UserService } from "./core/service/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {
    this.getProfileUser = this.getProfileUser.bind(this);
  }

  async getProfileUser(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const getUserProfile = await this.userService.getProfileUser(
        userId as number
      );
      res.status(200).json(getUserProfile);
    } catch (error) {
      next(error);
    }
  }
}
