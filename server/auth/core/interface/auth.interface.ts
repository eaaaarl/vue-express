import { SignUpUserDto } from "../entity/auth.entity";

export interface IAuthRepository {
  createUser(signUpData: SignUpUserDto): Promise<IAuthResponse>;
  findUserByEmail(email: string): Promise<IAuthResponse | null>;
  findUserById(id: number): Promise<IAuthResponse | null>;
}

export interface IAuthResponse {
  id: number;
  email: string;
  name?: string;
  password: string;
}
