import { AuthMiddleware } from "../infrastructure/middleware/auth.middleware";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./core/service/auth.service";

const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
const middleware = new AuthMiddleware(authService);

export const authController = new AuthController(authService);
export const protectRoute = middleware.protectRoute.bind(authController);
