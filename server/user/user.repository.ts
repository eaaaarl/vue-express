import { PrismaClient } from "@prisma/client";
import { UserData } from "./core/entity/User";
import { IUserRepository } from "./core/interface/IUserRepository";
import {
  DatabaseError,
  ValidationError,
} from "../infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();
  async getProfileById(id: number): Promise<UserData | null> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new ValidationError("User was not found in the database");
      }
      const existingUser = { ...user, name: user.name ?? "" };
      return existingUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError("Database Error or getProfileById method");
      }

      throw Error;
    }
  }
}
