import {
  NotFoundError,
  ValidationError,
} from "../../../infrastructure/errors/customErrors";
import { UserRepository } from "../../user.repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    this.getProfileUser = this.getProfileUser.bind(this);
  }

  async getProfileUser(userId: number) {
    if (!userId) {
      throw new NotFoundError("User id is not found");
    }

    const user = this.userRepository.getProfileById(userId);
    if (!user) {
      throw new ValidationError("User was not found in the database");
    }

    return user;
  }
}
