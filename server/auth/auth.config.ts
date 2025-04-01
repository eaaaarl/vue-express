import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./core/service/auth.service";

const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);

export const authController = new AuthController(authService);
