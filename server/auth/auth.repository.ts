import { PrismaClient } from "@prisma/client";
import {
  IAuthRepository,
  IAuthResponse,
} from "./core/interface/auth.interface";
import { SignUpUserDto } from "./core/entity/auth.entity";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseError } from "../infrastructure/errors/customErrors";

export class AuthRepository implements IAuthRepository {
  private prisma = new PrismaClient();

  async createUser(signUpData: SignUpUserDto): Promise<IAuthResponse> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: signUpData.email,
          password: signUpData.password,
          name: signUpData.name,
        },
      });

      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name!,
        password: newUser.password,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at createUser: " + error.message
        );
      }
      throw Error;
    }
  }

  async findUserByEmail(email: string): Promise<IAuthResponse | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name!,
        password: user.password,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at findUserByEmail: " + error.message
        );
      }
      throw Error;
    }
  }

  async findUserById(id: number): Promise<IAuthResponse | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name!,
        password: user.password,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at findUserById: " + error.message
        );
      }
      throw Error;
    }
  }
}
