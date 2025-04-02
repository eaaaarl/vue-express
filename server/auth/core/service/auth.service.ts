import {
  AuthenticationError,
  ValidationError,
} from "../../../infrastructure/errors/customErrors";
import { signInSchema } from "../../../schemas/auth/signIn.schema";
import { signUpSchema } from "../../../schemas/auth/signUp.schema";
import { toHashPassword, validatePassword } from "../../../utils/bcrypt";
import { verifyToken } from "../../../utils/verifyToken";
import { AuthRepository } from "../../auth.repository";
import { SignInUserDto, SignUpUserDto } from "../entity/auth.entity";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(signIn: SignInUserDto) {
    const { email, password } = signInSchema.parse(signIn);
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new AuthenticationError(
        "Cannot find an account with that email. try again."
      );
    }

    const isPasswordMatched = await validatePassword(password, user.password);
    if (!isPasswordMatched) {
      throw new AuthenticationError("Invalid Password. Please try again");
    }

    return user;
  }

  async signUp(SignUp: SignUpUserDto) {
    const { email, password, name } = signUpSchema.parse(SignUp);
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ValidationError("User already exists with this email");
    }
    const hashedPassword = await toHashPassword(password);
    const newUser = await this.authRepository.createUser({
      ...SignUp,
      password: hashedPassword,
      name: name || "",
    });
    return newUser;
  }

  async validateToken(token: string) {
    try {
      const decoded = verifyToken(token);
      const user = await this.authRepository.findUserById(decoded.userId);
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      return null;
    } catch (error) {
      throw new AuthenticationError("Invalid or expired token");
    }
  }
}
