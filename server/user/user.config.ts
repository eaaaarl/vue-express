import { UserService } from "./core/service/user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export const userController = new UserController(userService);
